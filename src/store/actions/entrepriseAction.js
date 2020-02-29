const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const ajouterntreprise = (data) =>{
    return (dispatch ,getState)=>{

        dispatch({
            type : "LOADING_ENTREPRISE"
        })
        ipcRenderer.send("entreprise:ajouter", {...data});
    
        ipcRenderer.once('entreprise:ajouter', function (event,data) {
         
          dispatch({
            type : "STOP_LOADING_ENTREPRISE"
        });
        if(data){
          dispatch({
              type : "AJOUTER_ENTREPRISE",
              payload : data
          });
        }else{
          dispatch({
            type : "ERROR_ENTREPRISE",
            payload : data
        });
        }
    });
          
       
    }
}

export const getEtreprise = ()=>{
    return (dispatch,getState)=>{
        ipcRenderer.send("entreprise", {});
    
        ipcRenderer.once('entreprise', function (event,data) {
         
          dispatch({
            type : "STOP_LOADING_ENTREPRISE"
        });
        if(Array.isArray(data)){
          dispatch({
              type : "GET_ONE_ENTREPRISE",
              payload : data[0]
          });
        }else{
          dispatch({
            type : "ERROR_ENTREPRISE",
            payload : data
        });
        }
    });
    }
}