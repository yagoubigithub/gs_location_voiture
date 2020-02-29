const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const connexion = (data) =>{
    return (dispatch ,getState)=>{

      dispatch({
        type : "LOADING_AUTH"
    })
    ipcRenderer.send("user", {...data});
    
    ipcRenderer.once('user', function (event,data) {
      dispatch({
        type : "STOP_LOADING_AUTH"
    });
    console.log(data);
    if(data[0] !== undefined){
      dispatch({
        type : "AUTH_SUCCESS",
        payload : {
          username : data[0].username,
          password :  data[0].password
        }
    });
    }else{
      dispatch({
        type : "AUTH_ERROR",
        payload : "username ou mot de passe invalid"
    });
    }
      
    });
    if(data.password === "admin" && data.username === "admin"){
    
    }else{
      
   
    }
    
     
    }
}