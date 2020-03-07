const electron = require("electron");
const isDev = require("electron-is-dev");

const path = require("path");
const fs = require("fs");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let db;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
    icon: `${path.join(__dirname, "./logo512.png")}`
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.maximize();
  //mainWindow.setMenu(null);
  //fs.existsSync(path.join(__dirname, "../build/images")) || fs.mkdirSync(path.join(__dirname, "../build/images"));

  // devTools
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
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
  db = new sqlite.Database("data.sqlite", error => {
    if (error) return console.log(error);
    console.log("Connnect to sqlite3");
  });
  const direname = __dirname;

  //get voiture
  ipcMain.on("voiture:direname", (event, value) => {
    mainWindow.webContents.send("voiture:direname", direname);
  });

  db.serialize(function() {
    /*   const Alert = require("electron-alert");

    let swalOptions = {
      position: "top-end",
      title:__dirname,
      text:__dirname,
      type: "success",
      showConfirmButton: true,
      timer: 25000
    };
    
    let alert = new Alert();
    
    alert.fireFrameless(swalOptions, null, true, false);*/
  /*  
       db.run('DROP TABLE image');
        db.run('DROP TABLE facture');
        db.run('DROP TABLE client');
        db.run('DROP TABLE voiture');
        db.run('DROP TABLE user');
        db.run('DROP TABLE entreprise');
        
  db.run('DROP TABLE location');
*/
    db.run(`CREATE TABLE IF NOT EXISTS voiture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    matricule TEXT,
    marque TEXT,
    modele TEXT,
    annee TEXT,
    coleur TEXT,
    assurance_debut TEXT,
    assurance_fin TEXT,
    prix REAL,
    disponibilite TEXT,
    image TEXT,
    status TEXT

   
)`);

    db.run(`CREATE TABLE IF NOT EXISTS image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  voiture_id INTEGER NOT NULL,
  image TEXT
 
)`);

    //get images

    ipcMain.on("voiture:images", (event, value) => {
      if (value.id !== undefined) {
        // get one images

        db.all(
          `SELECT * FROM image WHERE voiture_id=${value.id} ORDER BY id DESC`,
          function(err, rows) {
            if (err) mainWindow.webContents.send("voiture:images", err);
            mainWindow.webContents.send("voiture:images", rows);
          }
        );
      }
    });

    //get voiture
    ipcMain.on("voiture", (event, value) => {
      if (value.id !== undefined) {
        // get one voiture
        db.get("SELECT * FROM voiture WHERE id=" + value.id, function(
          err,
          row
        ) {
          if (err) mainWindow.webContents.send("voiture", err);
          mainWindow.webContents.send("voiture", row);
        });
      } else {
        //  get all voiture

        db.all("SELECT * FROM voiture ORDER BY id DESC", function(err, rows) {
          if (err) mainWindow.webContents.send("voiture", err);
          mainWindow.webContents.send("voiture", rows);
        });
      }
    });

    //AJOUTER VOITURE
    ipcMain.on("voiture:ajouter", (event, value) => {
      if (value.nom !== undefined) {
        // ajouter
        db.run(
          `
               INSERT INTO voiture(nom , modele , marque , annee , coleur ,assurance_debut ,
                assurance_fin , matricule , prix , disponibilite , image , status) VALUES ('${value.nom}','${value.modele}','${value.marque}','${value.annee}','${value.coleur}','${value.assurance_debut}','${value.assurance_fin}','${value.matricule}', ${value.prix} ,'disponible' , '', 'undo') `,
          function(err) {
            const voiture_id = this.lastID;

            ajouterImages(voiture_id, value.images).then(()=>{

              db.all("SELECT * FROM voiture ORDER BY id DESC", function(
                err,
                rows
              ) {
                if (err) mainWindow.webContents.send("voiture:ajouter", err);
                mainWindow.webContents.send("voiture:ajouter", rows);
              });
            }).catch(err=>{
              console.log(err)
            });

            // ajouter les images

          }
        );
      }
    });

    //SEARCH VOITURE

    ipcMain.on("voiture:search", (event, value) => {
      if (value.nom !== undefined) {
        // get one voiture
        db.all(
          "SELECT * FROM voiture WHERE nom LIKE '%" +
            value.nom +
            "%' AND  matricule LIKE '%" +
            value.matricule +
            "%' AND modele LIKE '%" +
            value.modele +
            "%' AND marque LIKE '%" +
            value.marque +
            "%'  ORDER BY id DESC",
          function(err, rows) {
            if (err) mainWindow.webContents.send("voiture:search", err);

            mainWindow.webContents.send("voiture:search", rows);
          }
        );
      }
    });

    //delete voiture

    ipcMain.on("voiture:delete", (event, value) => {
      if (value.id !== undefined) {
        // get one voiture

        db.run(
          `UPDATE voiture  SET status='${value.status}' WHERE id = ${value.id};`,
          function(err) {
            if (err) mainWindow.webContents.send("voiture:delete", err);

            db.all("SELECT * FROM voiture ORDER BY id DESC", function(
              err,
              rows
            ) {
              if (err) mainWindow.webContents.send("voiture:delete", err);
              mainWindow.webContents.send("voiture:delete", rows);
            });
          }
        );
      }
    });
  });

  // modifier voiture

  ipcMain.on("voiture:modifier", (event, value) => {
    console.log(value)
    if (value.nom !== undefined) {
      // modifier
      deleteImages(value.id, value.images).then(()=>{
        db.run(
          `
         UPDATE voiture SET nom='${value.nom}' , modele='${value.modele}' , marque='${value.marque}' , annee='${value.annee}' , coleur='${value.coleur}' , assurance_debut='${value.assurance_debut}' , assurance_fin='${value.assurance_fin}' matricule='${value.matricule}' , disponibilite='${value.disponibilite}' , image='' WHERE  id=${value.id}  `,
          function(err) {
            ajouterImages(value.id, value.images).then(()=>{
 db.all("SELECT * FROM voiture ORDER BY id DESC", function(err, rows) {
              if (err) mainWindow.webContents.send("voiture:modifier", err);
  
              db.get("SELECT * FROM voiture WHERE id=" + value.id, function(
                err,
                row
              ) {
                if (err) mainWindow.webContents.send("voiture:modifier", err);
  
               
                db.all(
                  `SELECT * FROM image WHERE voiture_id=${value.id} ORDER BY id DESC`,
                  function(err, images) {
                    if (err) mainWindow.webContents.send("voiture:modifier", err);
                  
                    const data = {
                      voitures: rows,
                      voiture: row,
                      images
                    };
                    
                    mainWindow.webContents.send("voiture:modifier", data);
                  }
                );
               
              
              });
            });
            }).catch(err=>{
              console.log(err)
            });
  
           
          }
        );
      }).catch(err=>{
        console.log(err)
      });
     

    
    }
  });

  ipcMain.on("voiture:entree", (event, value) => {
    if (value.id !== undefined) {
      // modifier

      db.run(
        `
       UPDATE voiture SET  disponibilite='disponible' WHERE  id=${value.id}  `,
        function(err) {
          db.all("SELECT * FROM voiture ORDER BY id DESC", function(err, rows) {
            if (err) mainWindow.webContents.send("voiture:entree", err);
            mainWindow.webContents.send("voiture:entree", rows);
          });
        }
      );

      /*
        
                      */
    }
  });

  /************************************************************************************************ */

  //Client

  //db.run('DROP TABLE client');

  db.run(`CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT,
    date_naissance TEXT,
    numero_cart TEXT,
    telephone TEXT,
    email TEXT,
    adresse TEXT,
    confiance TEXT,
    status TETX
   
)`);

  //get client
  ipcMain.on("client", (event, value) => {
    if (value.id !== undefined) {
      // get one voiture
      db.get("SELECT * FROM client WHERE id=" + value.id, function(err, row) {
        if (err) mainWindow.webContents.send("client", err);
        mainWindow.webContents.send("client", row);
      });
    } else {
      //  get all client

      db.all("SELECT * FROM client ORDER BY id DESC", function(err, rows) {
        if (err) mainWindow.webContents.send("client", err);
        mainWindow.webContents.send("client", rows);
      });
    }
  });

  //AJOUTER CLIENT
  ipcMain.on("client:ajouter", (event, value) => {
    if (value.nom !== undefined) {
      // ajouter
      db.run(
        `
               INSERT INTO client(nom , prenom , date_naissance , numero_cart , telephone , email , adresse , confiance  , status) VALUES ('${value.nom}','${value.prenom}','${value.date_naissance}','${value.numero_cart}','${value.telephone}','${value.email}','${value.adresse}','confiance', 'undo') `,
        function(err) {
          db.all("SELECT * FROM client ", function(err, rows) {
            if (err) mainWindow.webContents.send("client:ajouter", err);
            mainWindow.webContents.send("client:ajouter", rows);
          });
        }
      );
    }
  });

  // modifier client

  ipcMain.on("client:modifier", (event, value) => {
    if (value.nom !== undefined) {
      // modifier

      db.run(
        `
       UPDATE client SET nom='${value.nom}' , prenom='${value.prenom}' , date_naissance='${value.date_naissance}' , numero_cart='${value.numero_cart}' , telephone='${value.telephone}' , email='${value.email}' , adresse='${value.adresse}' , confiance='${value.confiance}' WHERE  id=${value.id}  `,
        function(err) {
          if (err) mainWindow.webContents.send("client:modifier", err);
          db.all("SELECT * FROM client ", function(err, rows) {
            if (err) mainWindow.webContents.send("client:modifier", err);
            mainWindow.webContents.send("client:modifier", rows);
          });
        }
      );

      /*
        
                      */
    }
  });

  //delete client

  ipcMain.on("client:delete", (event, value) => {
    if (value.id !== undefined) {
      // get one voiture

      db.run(
        `UPDATE client  SET status = '${value.status}' WHERE id = ${value.id};`,
        function(err) {
          if (err) mainWindow.webContents.send("client:delete", err);

          db.all("SELECT * FROM client", function(err, rows) {
            if (err) mainWindow.webContents.send("client:delete", err);

            mainWindow.webContents.send("client:delete", rows);
          });
        }
      );
    }
  });

  //SEARCH CLIENT

  ipcMain.on("client:search", (event, value) => {
    if (value.nom !== undefined) {
      // get one voiture
      db.all(
        "SELECT * FROM client WHERE nom LIKE '%" +
          value.nom +
          "%' AND prenom LIKE '%" +
          value.prenom +
          "%' AND numero_cart LIKE '%" +
          value.numero_cart +
          "%' ORDER BY id DESC",
        function(err, rows) {
          if (err) mainWindow.webContents.send("client:search", err);

          mainWindow.webContents.send("client:search", rows);
        }
      );
    }
  });

  /****************************************************************************** */
  //LOCATION

  //db.run('DROP TABLE location');

  db.run(`CREATE TABLE IF NOT EXISTS location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    voiture_id INTEGER NOT NULL,
    facture_id INTEGER NOT NULL,
    date_entree TEXT,
    date_sortie TEXT,
    remise REAL,
    prix_totale TEXT,
    status TEXT
   
)`);
  //db.run('DROP TABLE facture');

  db.run(`CREATE TABLE IF NOT EXISTS facture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    facture_date TEXT,
    status TEXT
   
)`);

  //AJOUTER location
  ipcMain.on("location:ajouter", (event, value) => {
    db.run(
      `
            INSERT INTO facture(client_id , facture_date , status) VALUES (${value.client.id} , '${value.facture_date}' , 'undo') `,
      function(err) {
        const facture_id = this.lastID;

        value.voiture.map(v => {
          if (value.client.nom !== undefined) {
            // ajouter
            db.run(
              `
                       INSERT INTO location(client_id , voiture_id , facture_id , date_entree , date_sortie , remise , prix_totale  , status) VALUES (${value.client.id},${v.voiture.id}, ${facture_id} ,'${v.date_entree}','${v.date_sortie}', ${v.remise},'${v.prix_totale}', 'undo') `,
              function(err) {
                db.run(
                  `UPDATE voiture  SET disponibilite = 'loué' WHERE id = ${v.voiture.id};`,
                  function(err) {
                    if (err)
                      mainWindow.webContents.send("location:ajouter", err);
                  }
                );
              }
            );
          }
        });

        mainWindow.webContents.send("location:ajouter", facture_id);
      }
    );
  });

  //get location
  ipcMain.on("location", (event, value) => {
    if (value.id !== undefined) {
      db.get(
        "SELECT l.id id , c.nom client_nom , c.prenom client_prenom  , c.telephone client_telephone , c.numero_cart numero_cart_client ,  v.nom voiture_nom, l.facture_id facture_id , v.id voiture_id , v.matricule voiture_matricule , v.modele modele , v.disponibilite voiture_disponibilite ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale , l.status status FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id WHERE l.id=" +
          value.id +
          " ORDER BY l.id DESC",
        function(err, row) {
          if (err) mainWindow.webContents.send("location", err);
          mainWindow.webContents.send("location", row);
        }
      );
    } else {
      db.all(
        "SELECT l.id id , c.nom client_nom , c.prenom client_prenom , c.telephone client_telephone , c.numero_cart numero_cart_client , v.nom voiture_nom ,v.matricule voiture_matricule , v.id voiture_id , v.disponibilite voiture_disponibilite , l.facture_id facture_id , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale,l.status status  FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id " +
          " ORDER BY l.id DESC",
        function(err, rows) {
          if (err) mainWindow.webContents.send("location", err);
          mainWindow.webContents.send("location", rows);
        }
      );
    }
  });




 //get location
 ipcMain.on("location:search", (event, value) => {

    db.all(
      `SELECT l.id id , c.nom client_nom , c.prenom client_prenom , c.telephone client_telephone , c.numero_cart numero_cart_client , v.nom voiture_nom ,v.matricule voiture_matricule , v.id voiture_id , v.disponibilite voiture_disponibilite , l.facture_id facture_id , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale,l.status status  FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id  WHERE c.nom LIKE '%${value.client_nom}%'  AND c.numero_cart LIKE '%${value.numero_cart}%'  AND v.nom LIKE '%${value.voiture_nom}%'  AND v.matricule LIKE '%${value.matricule}%'   ORDER BY l.id DESC` 
        ,
      function(err, rows) {
        if (err) mainWindow.webContents.send("location:search", err);
        mainWindow.webContents.send("location:search", rows);
      }
    );
  
});



  //delete location
  ipcMain.on("location:delete", (event, value) => {
    if (value.id !== undefined) {
      db.run(
        `
       UPDATE voiture SET  disponibilite='disponible' WHERE  id=${value.voiture_id}  `,
        function(err) {
          if (err) mainWindow.webContents.send("location:delete", err);
          db.run(`DELETE FROM location WHERE id=${value.id}`, function(
            err,
            row
          ) {
            db.all(
              "SELECT l.id id , c.nom client_nom , c.prenom client_prenom , c.telephone client_telephone , c.numero_cart numero_cart_client , v.nom voiture_nom ,v.matricule voiture_matricule , v.id voiture_id , v.disponibilite voiture_disponibilite , l.facture_id facture_id , v.modele modele ,l.date_sortie , l.date_entree , l.remise remise, l.prix_totale prix_totale,l.status status  FROM location l JOIN client c ON l.client_id=c.id JOIN voiture v ON v.id=l.voiture_id " +
                " ORDER BY l.id DESC",
              function(err, rows) {
                if (err) mainWindow.webContents.send("location:delete", err);
                mainWindow.webContents.send("location:delete", rows);
              }
            );
          });
        }
      );
    }
  });
  /****************************************************************************** */

  //FACTURE

  ipcMain.on("facture", (event, value) => {
    if (value.id !== undefined) {
      //get one
      db.all(
        "SELECT l.facture_id facture_number, f.facture_date facture_date , v.nom voiture_nom , v.matricule voiture_matricule , c.telephone client_telephone ,   l.date_entree date_entree, l.date_sortie date_sortie , c.nom client_nom ,c.prenom client_prenom , l.prix_totale prix_totale , l.remise remise  FROM location l JOIN client c ON c.id=l.client_id JOIN voiture v ON v.id=l.voiture_id AND l.facture_id=" +
          value.id +
          " JOIN facture f ON l.facture_id=f.id ORDER BY l.facture_id DESC",
        function(err, row) {
          if (err) mainWindow.webContents.send("facture", err);

          mainWindow.webContents.send("facture", row);
        }
      );
    } else {
      db.all(
        "SELECT l.facture_id facture_number, f.facture_date facture_date , v.nom voiture_nom , v.matricule voiture_matricule , c.telephone client_telephone ,  l.date_entree date_entree, l.date_sortie date_sortie , c.nom client_nom ,c.prenom client_prenom , l.prix_totale prix_totale , l.remise remise  FROM location l JOIN client c ON c.id=l.client_id JOIN voiture v ON v.id=l.voiture_id JOIN facture f ON f.id=l.facture_id ORDER BY l.facture_id DESC",
        function(err, row) {
          if (err) mainWindow.webContents.send("facture", err);

          mainWindow.webContents.send("facture", row);
        }
      );
    }
  });

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
  ipcMain.on("entreprise", (event, value) => {
    db.all("SELECT * FROM entreprise ", function(err, rows) {
      if (err) mainWindow.webContents.send("entreprise", err);
      mainWindow.webContents.send("entreprise", rows);
    });
  });

  //AJOUTER entreprise
  ipcMain.on("entreprise:ajouter", (event, value) => {
    if (value.entreprise !== undefined) {
      // ajouter
      db.run(
        `
               INSERT INTO entreprise(nom  , telephone , email , adresse ) VALUES ('${value.entreprise.nom}','${value.entreprise.telephone}','${value.entreprise.email}','${value.entreprise.adresse}') `,
        function(err) {
          db.run(
            `
                INSERT INTO user(username  , password  ) VALUES ('${value.user.username}','${value.user.password}') `,
            function(err) {
              db.all("SELECT * FROM entreprise ", function(err, rows) {
                if (err) mainWindow.webContents.send("entreprise:ajouter", err);
                mainWindow.webContents.send("entreprise:ajouter", rows);
              });
            }
          );
        }
      );

      /*
                
                              */
    }
  });

  // modifier entreprise

  ipcMain.on("entreprise:modifier", (event, value) => {
    if (value.nom !== undefined) {
      // modifier

      db.run(
        `
     UPDATE entreprise SET nom='${value.nom}' , telephone='${value.telephone}' , email='${value.email}' , adresse='${value.adresse}'  WHERE  id=${value.id}  `,
        function(err) {
          if (err) mainWindow.webContents.send("entreprise:modifier", err);
          db.all("SELECT * FROM entreprise ", function(err, rows) {
            if (err) mainWindow.webContents.send("entreprise:modifier", err);
            mainWindow.webContents.send("entreprise:modifier", rows);
          });
        }
      );

      /*
      
                    */
    }
  });

  //user

  //get user
  ipcMain.on("user", (event, value) => {
    db.all(
      `SELECT * FROM user WHERE username='${value.username}' AND password='${value.password}'`,
      function(err, rows) {
        if (err) mainWindow.webContents.send("user", err);
        mainWindow.webContents.send("user", rows);
      }
    );
  });

  //AJOUTER entreprise
  ipcMain.on("entreprise:ajouter", (event, value) => {
    if (value.entreprise.nom !== undefined) {
      // ajouter
      db.run(
        `
               INSERT INTO entreprise(nom  , telephone , email , adresse ) VALUES ('${value.entreprise.nom}','${value.entreprise.telephone}','${value.entreprise.email}','${value.entreprise.adresse}') `,
        function(err) {
          db.all("SELECT * FROM entreprise ", function(err, rows) {
            if (err) mainWindow.webContents.send("entreprise:ajouter", err);
            mainWindow.webContents.send("entreprise:ajouter", rows);
          });
        }
      );
    }
  });

  mainWindow.on("closed", () => {
    app.quit();
  });
});

function ajouterImages(voiture_id, images) {
 return new Promise((resolve, reject)=>{
  if (images.length > 0) {
  const d = new Date();
  const t = `${d.getTime()}-${Math.random()*1000}`;
  const data = []
  images.map((imagePath,index)=>{
    data.push({
      imagePath,
      imageName : `${t}-${index}`
    })

  })
  
  data.map((image,index )=> {     
    fs.copyFile(
      image.imagePath,isDev
        ? path.join(__dirname, "images", image.imageName + ".png").toString()
        : path.join("", image.imageName + ".png").toString(),
      err => { 
        if (err) {
          reject(err)
        }         
      }
    );
   
  });
  data.map(image=>{
    
    db.run(`INSERT INTO image( voiture_id , image ) VALUES (${voiture_id},'${image.imageName}.png')`,(err,arr)=>{
      if(err) reject(err)
    })
  });
  resolve()
  

}
 })
  
    
   
}

function deleteImages(voiture_id, images) {

  const promisse = new Promise((resolve,reject)=>{
    db.all(
      `DELETE   FROM image WHERE voiture_id=${voiture_id} `,
      function(err, images) {
        if (err) reject(err);
        resolve();
      
      }
    );
  

    
  })
 
  return promisse;
}
