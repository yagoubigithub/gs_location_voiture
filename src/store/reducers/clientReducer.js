
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
                    voitures : action.payload.voitures,
                    voiture : action.payload.voiture,
                    error :  null,
                    voitureEdited :  true

                }
               
                    
        
          case 'STOP_LOADING_CLIENT' : 
          return{
              ...state,
              loading : false

          }
       
          case 'SEARCH_CLIENT' :
              return {
                ...state,
                clients : action.payload,
                error :  null
              }
       
        default :
        return state;
    }

    
}

export default ClientReducer;