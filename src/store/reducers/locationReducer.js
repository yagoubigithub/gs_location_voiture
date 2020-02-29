
const initStat = {
    error :null
};
const LocationReducer = (state = initStat, action) =>{
    console.log(action.type)
    switch(action.type){
        case 'LOADING_LOCATION' : 
        return{
            ...state,
            loading : true,
            error : null,

        }
            case 'READ_ONE_LOCATION' : 
                return {
                    ...state,
                    location : action.payload,
                    error :  null
                }
            case 'READ_ALL_LOCATION' :
               
           return {
                        ...state,
                        locations : action.payload,
                        error :  null
                    }

            case 'ERROR_LOCATION' :
               return {
                            ...state,
                            error :  action.payload
                        }
            case 'AJOUTER_LOCATION' :
                return {
                    ...state,
                    locations : action.payload,
                    error :  null,
                    locationCreated :  true

                }

                case 'MODIFIER_LOCATION' :
                return {
                    ...state,
                    locations : action.payload.locations,
                    location : action.payload.location,
                    error :  null,
                    locationEdited :  true

                }
               
                    
        
          case 'STOP_LOADING_LOCATION' : 
          return{
              ...state,
              loading : false

          }
          case 'REMOVE_LOCATION_EDITED' : 
          return{
              ...state,
              locationEdited : false

          }
       
          case 'SEARCH_LOCATION' :
              return {
                ...state,
                locations : action.payload,
                error :  null
              }

              case 'ADD_TO_CORBEILLE_LOCATION' :
                  return {
                      ...state,
                      locations : action.payload,
                      error : null
                  }
                  case 'UNDO_DELETE_LOCATION' :
                    return {
                        ...state,
                        locations : action.payload,
                        error : null
                    }
       
        default :
        return state;
    }

    
}

export default LocationReducer;