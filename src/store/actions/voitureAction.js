import axios from 'axios';

const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const ajouterVoiture = (data) =>{
    return (dispatch ,getState)=>{
    
      
      dispatch({
        type : "LOADING_VOITURE"
    })
    ipcRenderer.send("voiture:ajouter", {...data});

    ipcRenderer.once('voiture:ajouter', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_VOITURE"
    });
    if(Array.isArray(data)){
      dispatch({
          type : "AJOUTER_VOITURE",
          payload : data
      });
    }else{
      dispatch({
        type : "ERROR_VOITURE",
        payload : data
    });
    }
});
      
   

    }
}


export const modifierVoiture  = (voiture) =>{
  return (dispatch,getState) =>{
    dispatch({
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:modifier", {...voiture});

  ipcRenderer.once('voiture:modifier', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(data){
    dispatch({
        type : "MODIFIER_VOITURE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_VOITURE",
      payload : data
  });
  }
});

  
  }
}


export const getVoiture = (id) =>{
    return (dispatch ,getState)=>{

    
  
      dispatch({
        type : "LOADING_VOITURE"
    })
    ipcRenderer.send("voiture", {id});

    
    ipcRenderer.once('voiture', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_VOITURE"
    });
    if(data.nom){
      dispatch({
          type : "READ_ONE_VOITURE",
          payload : data
      });
    }else{
      dispatch({
        type : "ERROR_VOITURE",
        payload :data
    });
    }
});
      


    }
}




export const getDirename = () =>{
  return (dispatch ,getState)=>{

  

    dispatch({
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:direname", {});

  
  ipcRenderer.once('voiture:direname', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  
  if(data){
     dispatch({
        type : "DIRENAME",
        payload : data
    });
  }
   
 
  
});
  
  }
}

//undo delete
export const undoDeleteVoiture = (id) =>{
  return (dispatch ,getState)=>{

    dispatch({
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:delete", {id, status :  "undo"});

  ipcRenderer.once('voiture:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "UNDO_DELETE_VOITURE",
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

export const getAllVoiture = () =>{
    return (dispatch ,getState)=>{

      
      dispatch({
        type : "LOADING_VOITURE"
    })
    ipcRenderer.send("voiture", {});

    
    ipcRenderer.once('voiture', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_VOITURE"
    });
    if(Array.isArray(data)){
      dispatch({
          type : "READ_ALL_VOITURE",
          payload : data
      });
    }else{
      dispatch({
        type : "ERROR_VOITURE",
        payload :data
    });
    }
});
      
      

     

    }
}

export const searchVoiture =(data) =>{
  return (dispatch ,getState) =>{
    
  
  
    dispatch({
      type : "LOADING_VOITURE"
  });
  ipcRenderer.send("voiture:search", {...data});

  ipcRenderer.once('voiture:search', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "SEARCH_VOITURE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_VOITURE",
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
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:delete", {id, status :  "corbeille"});

  ipcRenderer.once('voiture:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "ADD_TO_CORBEILLE_VOITURE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_VOITURE",
      payload :data
  });
  }
});
    

  }
}



//voiture entree 
export const voitureEntree = (id) =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:entree", {id});

  ipcRenderer.once('voiture:entree', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "ENTREE_VOITURE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_VOITURE",
      payload :data
  });
  }
});
    

  }
}

//voiture entree 
export const removeVoitureEntree = (id) =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "REMOVE_VOITURE_ENTREE"
  })
  
    

  }
}

//voiture entree 
export const removeVoitureCreated = () =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "REMOVE_VOITURE_CREATED"
  })
  
    

  }
}


//remove voiture edited 
export const removeVoitureEdited = () =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "REMOVE_VOITURE_EDITED"
  })
  
    

  }
}





export const getImages = (id) =>{
  return (dispatch ,getState)=>{

    
    dispatch({
      type : "LOADING_VOITURE"
  })
  ipcRenderer.send("voiture:images", {id});

  
  ipcRenderer.once('voiture:images', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_VOITURE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "READ_VOITURE_IMAGES",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_VOITURE",
      payload :data
  });
  }
});
    
    

   

  }
}