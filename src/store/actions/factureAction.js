const electron = window.require("electron");
const {ipcRenderer}  = electron;


export const getFacture = (id)=>{
    return (dispatch,getState)=>{
        ipcRenderer.send("facture", {id});
    
        ipcRenderer.once('facture', function (event,data) {
         
          dispatch({
            type : "STOP_LOADING_FACTURE"
        });
        if(data){
          dispatch({
              type : "GET_ONE_FACTURE",
              payload : data
          });
        }else{
          dispatch({
            type : "ERROR_FACTURE",
            payload : data
        });
        }
    });
    }
}
