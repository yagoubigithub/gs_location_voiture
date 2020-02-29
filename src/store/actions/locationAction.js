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
    if(Array.isArray(data)){
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


export const getClient = (id) =>{
    return (dispatch ,getState)=>{

    
  
      dispatch({
        type : "LOADING_CLIENT"
    })
    ipcRenderer.send("client", {id});

    
    ipcRenderer.once('client', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_CLIENT"
    });
    if(data.nom){
      dispatch({
          type : "READ_ONE_CLIENT",
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

export const searchCorbeillePersonne=(data) =>{
  return (dispatch ,getState) =>{
    
    dispatch({
      type : "LOADING_PERSONNE"
  })
   

    axios.post('/personne/search.php',{
     ...data
     
    }).then(res=>{
      dispatch({
        type : "STOP_LOADING_PERSONNE"
    });

      dispatch({
        type : "SEARCH_IN_PERSONNE",
        payload : res.data
    })
    
  })
  .catch(error=>{
      
    dispatch({
      type : "STOP_LOADING_PERSONNE"
  });
      dispatch({
          type : "ERROR_PERSONNE",
          payload : error
      })
  })
  }
}


//delete (mettre dans le corbeille)
export const addToCorbeille = (id) =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "LOADING_CLIENT"
  })
  ipcRenderer.send("client:delete", {id, status :  "corbeille"});

  ipcRenderer.once('client:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_CLIENT"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "ADD_TO_CORBEILLE_CLIENT",
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
