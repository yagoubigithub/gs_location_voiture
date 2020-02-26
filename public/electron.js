const electron = require('electron');
const isDev = require("electron-is-dev");

const path = require('path')
const fs = require('fs');


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let db;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true
        }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    const mainMenu = Menu.buildFromTemplate(menuTemplate);


    // devTools

    if (isDev) {

        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));

        installExtension(REDUX_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
        /*
            const path = require('path')
            const os = require('os')
            
            
            BrowserWindow.addDevToolsExtension(
              path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0')
            )
            BrowserWindow.addDevToolsExtension(
                path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
              )*/
    }

    const sqlite = require("sqlite3").verbose();
    db = new sqlite.Database('data.sqlite', (error) => {
        if (error) return console.log(error);
        console.log("Connnect to sqlite3")
    })

    db.serialize(function () {

       // db.run('DROP TABLE voiture');

        db.run(`CREATE TABLE IF NOT EXISTS voiture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    matricule TEXT,
    marque TEXT,
    modele TEXT,
    annee TEXT,
    coleur TEXT,
    disponibilite TEXT,
    status TEXT

   
)`);


        db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT NOT NULL,
    voiture_id TEXT

   
)`);
     

        //get voiture
        ipcMain.on('voiture', (event, value) => {

            if (value.id !== undefined) {
                // get one voiture
            } else {
                //  get all voiture



                db.all("SELECT * FROM voiture ", function (err, rows) {
                    if (err) mainWindow.webContents.send("voiture", err);
                    mainWindow.webContents.send("voiture", rows);
                });



            }
        })

        //AJOUTER VOITURE
        ipcMain.on('voiture:ajouter', (event, value) => {

            if (value.nom !== undefined) {
                // ajouter
                db.run(`
               INSERT INTO voiture(nom , modele , marque , annee , coleur , matricule , disponibilite , status) VALUES ('${value.nom}','${value.modele}','${value.marque}','${value.annee}','${value.coleur}','${value.matricule}','disponible', 'undo') `, function (err) {
                    const lastId = this.lastID;


                    // ajouter les images
                    if (value.images !== undefined) {
                        value.images.forEach((imagePath, index) => {
                            const d = new Date();
                            const imageName = `${d.getTime()}${Math.random() * 100}`;




                            // copy image.
                            fs.copyFile(imagePath, path.join(__dirname, "images", imageName + ".png").toString(), (err) => {
                                if (err) throw err;

                                db.run(`
                                     INSERT INTO images(image , voiture_id ) VALUES ('${imageName}.png','${lastId}') `)
                                console.log(`image was copied to ${imageName}.txt`);


                            });

                        });
                    }

                    db.all("SELECT * FROM voiture ", function (err, rows) {
                        if (err) mainWindow.webContents.send("voiture", err);
                        mainWindow.webContents.send("voiture:ajouter", rows);
                    });
                });


                /*
                
                              */
            }
        })


        //SEARCH VOITURE

        ipcMain.on('voiture:search', (event, value) => {


            if (value.nom !== undefined) {
                // get one voiture
                db.all("SELECT * FROM voiture WHERE nom LIKE '%" + value.nom + "%'", function (err, rows) {
                    if (err) mainWindow.webContents.send("voiture:search", err);

                    mainWindow.webContents.send("voiture:search", rows);
                });
            }
        })


        //delete voiture

        ipcMain.on('voiture:delete', (event, value) => {


            if (value.id !== undefined) {
                // get one voiture



                db.run(`UPDATE voiture  SET status = '${value.status}' WHERE id = ${value.id};` , function (err) {
                    if (err) mainWindow.webContents.send("voiture:delete", err);

                    db.all("SELECT * FROM voiture", function (err, rows) {
                        if (err) mainWindow.webContents.send("voiture", err);
    
                        mainWindow.webContents.send("voiture", rows);
                    });
                });
            }
        })

    });






    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    })


});



const menuTemplate = [

    {

        label: "File",

    }

];

if (process.platform === "darwin") {
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== "production") {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: "Toggle DevTools",
                accelerator: process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Alt+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()

                }
            }
        ]
    })
}