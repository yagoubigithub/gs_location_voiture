import axios from 'axios';

export const connexion = (data) =>{
    return (dispatch ,getState)=>{

      dispatch({
        type : "LOADING_AUTH"
    })
    if(data.password === "admin" && data.username === "admin"){
      dispatch({
        type : "AUTH_SUCCESS",
        payload : {
          username : "admin",
          password :  "admin"
        }
    });
    }else{
      dispatch({
        type : "AUTH_ERROR",
        payload : "username ou mot de passe invalid"
    });
    dispatch({
      type : "STOP_LOADING_AUTH"
  });
    }
    
      /*
        //axios if multi-post
        dispatch({
            type : "LOADING_AUTH"
        })
          axios.post('/personne/auth.php',{
              ...data
          }).then(res=>{
            dispatch({
              type : "STOP_LOADING_AUTH"
          });
          if(res.data.error){
            dispatch({
                type : "AUTH_ERROR",
                payload : res.data.error
            });
          }else{
              dispatch({
                type : "AUTH_SUCCESS",
                payload : res.data
            });
          }
            
        })
        .catch(error=>{
          dispatch({
            type : "STOP_LOADING_AUTH"
        });
            dispatch({
                type : "AUTH_ERROR",
                payload : error.message
            });
        })
        */
    }
}