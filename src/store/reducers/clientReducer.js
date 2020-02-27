
const initStat = {
    error :null
};
const ClientReducer = (state = initStat, action) =>{
    console.log(action.type)
    switch(action.type){
        case 'LOADING_CLIENT' : 
        return{
            ...state,
            loading : true,
            error : null,

        }
            case 'READ_ONE_CLIENT' : 
                return {
                    ...state,
                    client : action.payload,
                    error :  null
                }
            case 'READ_ALL_CLIENT' :
               
           return {
                        ...state,
                        clients : action.payload,
                        error :  null
                    }

            case 'ERROR_CLIENT' :
               return {
                            ...state,
                            error :  action.payload
                        }
            case 'AJOUTER_CLIENT' :
                return {
                    ...state,
                    clients : action.payload,
                    error :  null,
                    clientCreated :  true

                }

                case 'MODIFIER_CLIENT' :
                return {
                    ...state,
                    clients : action.payload.clients,
                    client : action.payload.client,
                    error :  null,
                    clientEdited :  true

                }
               
                    
        
          case 'STOP_LOADING_CLIENT' : 
          return{
              ...state,
              loading : false

          }
          case 'REMOVE_CLIENT_EDITED' : 
          return{
              ...state,
              clientEdited : false

          }
       
          case 'SEARCH_CLIENT' :
              return {
                ...state,
                clients : action.payload,
                error :  null
              }

              case 'ADD_TO_CORBEILLE_CLIENT' :
                  return {
                      ...state,
                      clients : action.payload,
                      error : null
                  }
                  case 'UNDO_DELETE_CLIENT' :
                    return {
                        ...state,
                        clients : action.payload,
                        error : null
                    }
       
        default :
        return state;
    }

    
}

export default ClientReducer;