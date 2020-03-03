const electron = window.require("electron");
const {ipcRenderer}  = electron;


export const getFacture = (id)=>{
    return (dispatch,getState)=>{
        ipcRenderer.send("facture", {id});
    console.log(id)
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



export const getAllFacture = ()=>{
  return (dispatch,getState)=>{
      ipcRenderer.send("facture", {});

      ipcRenderer.once('facture', function (event,data) {
       
        dispatch({
          type : "STOP_LOADING_FACTURE"
      });
      if(Array.isArray(data)){
        dispatch({
            type : "GET_ALL_FACTURE",
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
