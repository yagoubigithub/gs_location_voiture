
const initStat = {
    error :null
};
const VoitureReducer = (state = initStat, action) =>{
    console.log(action.type)
    switch(action.type){
        case 'LOADING_VOITURE' : 
        return{
            ...state,
            loading : true,
            error : null,

        }
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

                case 'MODIFIER_VOITURE' :
                return {
                    ...state,
                    voitures : action.payload.voitures,
                    voiture : action.payload.voiture,
                    error :  null,
                    voitureEdited :  true

                }
                case 'ERROR_AJOUTER_PERSONNE' :
                    return {
                                 ...state,
                                personneCreated : false,
                                error : action.payload
                    }
                    
        
          case 'STOP_LOADING_VOITURE' : 
          return{
              ...state,
              loading : false

          }
       
          case 'SEARCH_VOITURE' :
              return {
                ...state,
                voitures : action.payload,
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