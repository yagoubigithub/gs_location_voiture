const electron = require('electron');
const isDev = require("electron-is-dev");

const path = require('path')



const { app ,BrowserWindow,Menu ,ipcMain} = electron;

let mainWindow;
let db;

app.on('ready',()=>{
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

    if(isDev){
      
        const { default: installExtension, REACT_DEVELOPER_TOOLS,REDUX_DEVTOOLS } = require('electron-devtools-installer');

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
     db = new sqlite.Database(':memory:', (error)=>{
        if(error) return console.log(error);
        console.log("Connnect to sqlite3")
    })

    db.serialize(function() {

        
        db.run(`CREATE TABLE IF NOT EXISTS voiture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
   
)`);
       
        var stmt = db.prepare("INSERT INTO voiture(nom) VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();


        ipcMain.on('voiture', (event, value)=>{
    
            if(value.id !== undefined) {
                // get one voiture
            }else{
              //  get all voiture
              console.log("send request from database")
              const voitures = [];
              
              db.serialize(function() {
                db.all("SELECT *  FROM voiture", function(err, rows) {
                    mainWindow.webContents.send("voiture",rows);
                });
               
              });
             
            }
        })
       
        
      });
      
       
     



    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', ()=>{
        app.quit();
    })
   

});



const menuTemplate = [ 
    
    {
       
        label : "File",
      
         }
        
];

if(process.platform === "darwin"){
    menuTemplate.unshift({})
}

if(process.env.NODE_ENV !== "production"){
menuTemplate.push({
label : 'View',
    submenu : [
        {
            role  : 'reload'
         },
        {
            label : "Toggle DevTools",
            accelerator : process.platform === "darwin" ?"Command+Alt+I": "Ctrl+Alt+I",
            click(item,focusedWindow){
                focusedWindow.toggleDevTools()

            }
        }
    ]
})
}