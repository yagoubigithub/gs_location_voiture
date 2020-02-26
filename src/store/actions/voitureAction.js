import axios from 'axios';

const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const ajouterVoiture = (data) =>{
    return (dispatch ,getState)=>{
    
      
      dispatch({
        type : "LOADING_VOITURE"
    })
    ipcRenderer.send("voiture:ajouter", {...data});

    ipcRenderer.on('voiture:ajouter', function (event,data) {
     
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


export const modifierPersonne  = id =>{
  return (dispatch,getState) =>{


   



    //send to electron if one post

  
  }
}


export const getPersonne = (id) =>{
    return (dispatch ,getState)=>{

      dispatch({
        type : "LOADING_PERSONNE"
    })
  
      //axios if multi-post
      axios.get(`/personne/read.php?id=${id}`,{
        id :id
        
       }).then(res=>{
        dispatch({
          type : "STOP_LOADING_PERSONNE"
      })
         if(res.data.error){
          dispatch({
            type : "ERROR_PERSONNE",
            payload : res.data.error
        })
         }else{
         
          dispatch({
            type : "READ_ONE_PERSONNE",
            payload : res.data
        })
         }
     })
     .catch(error=>{ 
      dispatch({
        type : "STOP_LOADING_PERSONNE"
    });
         dispatch({
             type : "ERROR_PERSONNE",
             payload : error
         })
     });

      //send to electron if one post
  

    }
}

export const getAllVoiture = () =>{
    return (dispatch ,getState)=>{

      
      dispatch({
        type : "LOADING_VOITURE"
    })
    ipcRenderer.send("voiture", {});

    ipcRenderer.on('voiture', function (event,data) {
     
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


//delete a personne(mettre dans le corbeille)
export const addToCorbeille = (id) =>{
  return (dispatch ,getState)=>{

    //axios if multi-post
    dispatch({
      type : "LOADING_PERSONNE"
  })
    axios.get('/personne/delete.php?status=corbeille&id=' + id).then(res=>{
      dispatch({
        type : "STOP_LOADING_PERSONNE"
    });
    if(Array.isArray(res.data)){
      dispatch({
          type : "ADD_TO_CORBEILLE_PERSONNE",
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


//undo delete
export const undoDeletePersonne = (id) =>{
  return (dispatch ,getState)=>{

    //axios if multi-post
    dispatch({
      type : "LOADING_PERSONNE"
  })
    axios.get('/personne/delete.php?status=undo&id=' + id).then(res=>{
      dispatch({
        type : "STOP_LOADING_PERSONNE"
    });
    if(Array.isArray(res.data)){
      dispatch({
          type : "UNDO_DELETE_PERSONNE",
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
