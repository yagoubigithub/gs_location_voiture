import axios from 'axios';

const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const ajouterLocation = (data) =>{
    return (dispatch ,getState)=>{
    
      
      dispatch({
        type : "LOADING_LOCATION"
    })
    ipcRenderer.send("location:ajouter", {...data});

    ipcRenderer.once('location:ajouter', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_LOCATION"
    });
    if(data){
      dispatch({
          type : "AJOUTER_LOCATION",
          payload : data
      });
    }else{
           dispatch({
        type : "ERROR_LOCATION",
        payload : data
    });
    }
});

   

    }
}

export const removeFactureId = (id)=>{
  return (dispatch,getState)=>{
     dispatch({

      type :  "REMOVE_FACTURE_ID"
     })
  }
}
export const modifierLocation  = (client) =>{
  return (dispatch,getState) =>{
    dispatch({
      type : "LOADING_CLIENT"
  })
  ipcRenderer.send("client:modifier", {...client});

  ipcRenderer.once('client:modifier', function (event,clients) {
   
    dispatch({
      type : "STOP_LOADING_CLIENT"
  });
  if(Array.isArray(clients)){
    dispatch({
        type : "MODIFIER_CLIENT",
        payload : {clients, client}
    });
  }else{
    dispatch({
      type : "ERROR_CLIENT",
      payload : clients
  });
  }
});

  
  }
}

export const removeClientEdited = () =>{
  return (dispatch ,getState)=>{

    
  
    dispatch({
      type : "REMOVE_CLIENT_EDITED"
  });
}}


export const getLocation = (id) =>{
    return (dispatch ,getState)=>{

    
      dispatch({
        type : "LOADING_LOCATION"
    })
    ipcRenderer.send("location", {id});

    
    ipcRenderer.once('location', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_LOCATION"
    });
    if(data.id){
      dispatch({
          type : "READ_ONE_LOCATION",
          payload : data
      });
    }else{
      dispatch({
        type : "ERROR_LOCATION",
        payload :data
    });
    }
});

    }
}




export const getAllLocation = () =>{
    return (dispatch ,getState)=>{

      
      dispatch({
        type : "LOADING_LOCATION"
    })
    ipcRenderer.send("location", {});

    
    ipcRenderer.once('location', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_LOCATION"
    });
    if(Array.isArray(data)){
      dispatch({
          type : "READ_ALL_LOCATION",
          payload : data
      });
    }else{
      dispatch({
        type : "ERROR_LOCATION",
        payload :data
    });
    }
});
      
      

     

    }
}

export const searchLocation =(data) =>{
  return (dispatch ,getState) =>{
    
  
  
    dispatch({
      type : "LOADING_LOCATION"
  });
  ipcRenderer.send("location:search", {...data});

  ipcRenderer.once('location:search', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_LOCATION"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "SEARCH_LOCATION",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_LOCATION",
      payload :data
  });
  }
});
    

  
  }
}


//delete (mettre dans le corbeille)
export const addToCorbeille = (data) =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "LOADING_LOCATION"
  })
  ipcRenderer.send("location:delete", {id : data.id,voiture_id : data.voiture_id, status :  "corbeille"});

  ipcRenderer.once('location:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_LOCATION"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "ADD_TO_CORBEILLE_LOCATION",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_LOCATION",
      payload :data
  });
  }
});
    

  }
}


//undo delete
export const undoDeleteClient = (id) =>{
  return (dispatch ,getState)=>{

    dispatch({
      type : "LOADING_CLIENT"
  })
  ipcRenderer.send("client:delete", {id, status :  "undo"});

  ipcRenderer.once('client:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_CLIENT"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "UNDO_DELETE_CLIENT",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_CLIENT",
      payload :data
  });
  }
});

  }
}



//undo delete
export const Delete = (id) =>{
  return (dispatch ,getState)=>{

    //axios if multi-post
    dispatch({
      type : "LOADING_PERSONNE"
  })
    axios.get('/personne/delete.php?status=delete&id=' + id).then(res=>{
      dispatch({
        type : "STOP_LOADING_PERSONNE"
    });
    if(Array.isArray(res.data)){
      dispatch({
          type : "DELETE_PERSONNE",
          payload : res.data
      });
    }else{
      dispatch({
        type : "ERROR_PERSONNE",
        payload : res.data
    });
    }
  })
  .catch(error=>{
    dispatch({
      type : "STOP_LOADING_PERSONNE"
  });
      dispatch({
          type : "ERROR_PERSONNE",
          payload : error
      });
  })
    

    //send to electron if one post

  }
}
