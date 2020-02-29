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

      //  db.run('DROP TABLE voiture');

        db.run(`CREATE TABLE IF NOT EXISTS voiture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    matricule TEXT,
    marque TEXT,
    modele TEXT,
    annee TEXT,
    coleur TEXT,
    prix REAL,
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
                db.get("SELECT * FROM voiture WHERE id=" + value.id, function (err, row) {

                    if (err) mainWindow.webContents.send("voiture", err);

                    db.all("SELECT * FROM images WHERE voiture_id=" + value.id, function (err, rows) {

                        if (err) mainWindow.webContents.send("voiture", err);
                        row.images = [...rows]
                        console.log(row)
    
                        
                        mainWindow.webContents.send("voiture", row);
                    });
                  
                });

            
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
               INSERT INTO voiture(nom , modele , marque , annee , coleur , matricule , prix , disponibilite , status) VALUES ('${value.nom}','${value.modele}','${value.marque}','${value.annee}','${value.coleur}','${value.matricule}', ${value.prix} ,'disponible', 'undo') `, function (err) {
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




// modifier voiture

 
 ipcMain.on('voiture:modifier', (event, value) => {

    if (value.nom !== undefined) {
        // modifier

        console.log(value)
        db.run(`
       UPDATE voiture SET nom='${value.nom}' , modele='${value.modele}' , marque='${value.marque}' , annee='${value.annee}' , coleur='${value.coleur}' , matricule='${value.matricule}' WHERE  id=${value.id}  `, function (err) {
           

/*
            // ajouter les images
            if (value.images !== undefined) {
                value.images.forEach((imagePath, index) => {

                    //TODO DELETE OLD IMAGES

                    const d = new Date();
                    const imageName = `${d.getTime()}${Math.random() * 100}`;




                    // copy image.
                    fs.copyFile(imagePath, path.join(__dirname, "images", imageName + ".png").toString(), (err) => {
                        if (err) throw err;

                        db.run(`
                             INSERT INTO images(image , voiture_id ) VALUES ('${imageName}.png','${value.id}') `)
                        console.log(`image was copied to ${imageName}.txt`);


                    });

                });
            }
*/
            db.all("SELECT * FROM voiture ", function (err, rows) {
                if (err) mainWindow.webContents.send("voiture", err);
                mainWindow.webContents.send("voiture:modifier", rows);
            });
        });


        /*
        
                      */
    }
})


/************************************************************************************************ */

//Client

 //db.run('DROP TABLE client');

db.run(`CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT,
    telephone TEXT,
    email TEXT,
    adresse TEXT,
    confiance TEXT,
    status TETX
   
)`);

   //get client
   ipcMain.on('client', (event, value) => {

    if (value.id !== undefined) {
        // get one voiture
        db.get("SELECT * FROM client WHERE id=" + value.id, function (err, row) {

            if (err) mainWindow.webContents.send("client", err);
            mainWindow.webContents.send("client", row);
           
          
        });

    
    } else {
        //  get all client



        db.all("SELECT * FROM client ", function (err, rows) {
            if (err) mainWindow.webContents.send("client", err);
            mainWindow.webContents.send("client", rows);
            
        });



    }
})



        //AJOUTER CLIENT
        ipcMain.on('client:ajouter', (event, value) => {

            if (value.nom !== undefined) {
                // ajouter
                db.run(`
               INSERT INTO client(nom , prenom , telephone , email , adresse , confiance  , status) VALUES ('${value.nom}','${value.prenom}','${value.telephone}','${value.email}','${value.adresse}','confiance', 'undo') `, function (err) {
                    


                  

                    db.all("SELECT * FROM client ", function (err, rows) {
                        if (err) mainWindow.webContents.send("client:ajouter", err);
                        mainWindow.webContents.send("client:ajouter", rows);
                    });
                });


                /*
                
                              */
            }
        })



// modifier client

 
ipcMain.on('client:modifier', (event, value) => {

    if (value.nom !== undefined) {
        // modifier

    
        db.run(`
       UPDATE client SET nom='${value.nom}' , prenom='${value.prenom}' , telephone='${value.telephone}' , email='${value.email}' , adresse='${value.adresse}' , confiance='${value.confiance}' WHERE  id=${value.id}  `, function (err) {
           

        if (err) mainWindow.webContents.send("client:modifier", err);
            db.all("SELECT * FROM client ", function (err, rows) {
                if (err) mainWindow.webContents.send("client:modifier", err);
                mainWindow.webContents.send("client:modifier", rows);
            });
        });


        /*
        
                      */
    }
})

    //delete client

    ipcMain.on('client:delete', (event, value) => {


        if (value.id !== undefined) {
            // get one voiture



            db.run(`UPDATE client  SET status = '${value.status}' WHERE id = ${value.id};` , function (err) {
                if (err) mainWindow.webContents.send("client:delete", err);

                db.all("SELECT * FROM client", function (err, rows) {
                    if (err) mainWindow.webContents.send("client:delete", err);

                    mainWindow.webContents.send("client:delete", rows);
                });
            });
        }
    })


     //SEARCH CLIENT

     ipcMain.on('client:search', (event, value) => {


        if (value.nom !== undefined) {
            // get one voiture
            db.all("SELECT * FROM client WHERE nom LIKE '%" + value.nom + "%'", function (err, rows) {
                if (err) mainWindow.webContents.send("client:search", err);

                mainWindow.webContents.send("client:search", rows);
            });
        }
    })



    /****************************************************************************** */
//LOCATION


// db.run('DROP TABLE location');

 db.run(`CREATE TABLE IF NOT EXISTS location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    voiture_id INTEGER NOT NULL,
    date_entree TEXT,
    date_sortie TEXT,
    remise REAL,
    prix_totale TEXT,
    status TEXT
   
)`);


        //AJOUTER location
        ipcMain.on('location:ajouter', (event, value) => {

            if (value.client.nom !== undefined && value.voiture.nom !== undefined) {
                // ajouter
                db.run(`
               INSERT INTO location(client_id , voiture_id , date_entree , date_sortie , remise , prix_totale  , status) VALUES (${value.client.id},${value.voiture.id},'${value.date_entree}','${value.date_sortie}', ${value.remise},'${value.prix_totale}', 'undo') `, function (err) {
                    

               
                  

                    db.all("SELECT c.nom client_nom , c.prenom client_prenom , v.nom voiture_nom , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale ,l.status status FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id  ", function (err, rows) {
                        if (err) mainWindow.webContents.send("location:ajouter", err);
                        mainWindow.webContents.send("location:ajouter", rows);
                    });
                });


                /*
                
                              */
            }
        })


         //get location
   ipcMain.on('location', (event, value) => {

    if (value.id !== undefined) {
        // get one voiture
        db.get("SELECT c.nom client_nom , c.prenom client_prenom , v.nom voiture_nom , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale  FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id WHERE id=" + value.id, function (err, row) {

            if (err) mainWindow.webContents.send("location", err);
            mainWindow.webContents.send("location", row);
           
          
        });

    
    } else {
        //  get all client



        db.all("SELECT c.nom client_nom , c.prenom client_prenom , v.nom voiture_nom , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale  FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id ", function (err, rows) {
            if (err) mainWindow.webContents.send("location", err);
            mainWindow.webContents.send("location", rows);
            
        });



    }
})

/*********************************************************************************** */

//Entreprise

 //db.run('DROP TABLE entreprise');

 db.run(`CREATE TABLE IF NOT EXISTS entreprise (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    telephone TEXT,
    email TEXT,
    adresse TEXT
   
)`);
//db.run('DROP TABLE user');

db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT ,
    password TEXT
   
)`);

   //get entrepise
   ipcMain.on('entreprise', (event, value) => {

    



        db.all("SELECT * FROM entreprise ", function (err, rows) {
            if (err) mainWindow.webContents.send("entreprise", err);
            mainWindow.webContents.send("entreprise", rows);
            
        });



    
})



        //AJOUTER entreprise
        ipcMain.on('entreprise:ajouter', (event, value) => {
console.log(value)
            if (value.entreprise !== undefined) {
                // ajouter
                db.run(`
               INSERT INTO entreprise(nom  , telephone , email , adresse ) VALUES ('${value.entreprise.nom}','${value.entreprise.telephone}','${value.entreprise.email}','${value.entreprise.adresse}') `, function (err) {
                    

                
                db.run(`
                INSERT INTO user(username  , password  ) VALUES ('${value.user.username}','${value.user.password}') `, function (err) {

                 
                   
 
                     db.all("SELECT * FROM entreprise ", function (err, rows) {
                         if (err) mainWindow.webContents.send("entreprise:ajouter", err);
                         mainWindow.webContents.send("entreprise:ajouter", rows);
                     });
                 });
 

                  
                });


                /*
                
                              */
            }
        })


        //user

 

   //get user
   ipcMain.on('user', (event, value) => {

    



        db.all(`SELECT * FROM user WHERE username='${value.username}' AND password='${value.password}'`, function (err, rows) {
            console.log(rows)
            if (err) mainWindow.webContents.send("user", err);
            mainWindow.webContents.send("user", rows);
            
        });



    
})



        //AJOUTER entreprise
        ipcMain.on('entreprise:ajouter', (event, value) => {

            if (value.entreprise.nom !== undefined) {
                // ajouter
                db.run(`
               INSERT INTO entreprise(nom  , telephone , email , adresse ) VALUES ('${value.entreprise.nom}','${value.entreprise.telephone}','${value.entreprise.email}','${value.entreprise.adresse}') `, function (err) {
                    

                
                  

                    db.all("SELECT * FROM entreprise ", function (err, rows) {
                        if (err) mainWindow.webContents.send("entreprise:ajouter", err);
                        mainWindow.webContents.send("entreprise:ajouter", rows);
                    });
                });


                /*
                
                              */
            }
        })


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