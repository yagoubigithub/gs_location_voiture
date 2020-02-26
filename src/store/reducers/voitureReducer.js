
const initStat = {
    error :null
};
const VoitureReducer = (state = initStat, action) =>{
    switch(action.type){

            case 'READ_ONE_VOITURE' : 
                return {
                    ...state,
                    voiture : action.payload,
                    error :  null
                }
            case 'READ_ALL_VOITURE' :
               
           return {
                        ...state,
                        voitures : action.payload,
                        error :  null
                    }

            case 'ERROR_VOITURE' :
               return {
                            ...state,
                            error :  action.payload
                        }
            case 'AJOUTER_VOITURE' :
                return {
                    ...state,
                    voitures : action.payload,
                    error :  null,
                    voitureCreated :  true

                }
                case 'ERROR_AJOUTER_PERSONNE' :
                    return {
                                 ...state,
                                personneCreated : false,
                                error : action.payload
                    }
                    
          case 'LOADING_VOITURE' : 
          return{
              ...state,
              loading : true,
              error : null,

          }
          case 'STOP_LOADING_VOITURE' : 
          return{
              ...state,
              loading : false

          }
       
          case 'SEARCH_IN_PERSONNE' :
              return {
                ...state,
                personnes : action.payload,
                error :  null
              }
        case "ADD_TO_CORBEILLE_PERSONNE" : 
        return {
            ...state,
            personnes : action.payload,
            error : null
        }
        case "UNDO_DELETE_PERSONNE" :
            return {
                ...state,
                personnes :action.payload,
                error : null,

            }
        
            case "DELETE_PERSONNE" :
            return {
                ...state,
                personnes :action.payload,
                error : null,

            }
        default :
        return state;
    }

    
}

export default VoitureReducer;