const electron = require('electron');
const isDev = require("electron-is-dev");

const path = require('path')



const { app ,BrowserWindow,Menu ,ipcMain} = electron;

let mainWindow;
let addWindow;

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
  
   
    




    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', ()=>{
        app.quit();
    })
   

});


ipcMain.on('todo:add', (event, value)=>{
    mainWindow.webContents.send('todo:add', value);
    
    addWindow.close();
    
})
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