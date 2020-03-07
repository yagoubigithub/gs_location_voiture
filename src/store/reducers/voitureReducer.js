
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
        case 'DIRENAME' : 
        return {
            ...state,
            direname : action.payload,
            error : null

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
            case 'READ_VOITURE_IMAGES' :
                return{
                    ...state,
                    images : action.payload,
                    error : null
                }

                case 'MODIFIER_VOITURE' :
                return {
                    ...state,
                    voitures : action.payload.voitures,
                    voiture : action.payload.voiture,
                    error :  null,
                    voitureEdited :  true,
                    images : action.payload.images

                }
              case   'ENTREE_VOITURE' : 
                return {
                    ...state,
                    voitures : action.payload,
                    voitureEntree : true
                }
                case 'REMOVE_VOITURE_ENTREE' : 
                return {
                    ...state,
                    voitureEntree : undefined
                }
                case 'REMOVE_VOITURE_EDITED' :
                    return {
                        ...state,
                        voitureEdited : undefined,
                        voiture : undefined,
                        images :undefined
                    }
                case 'ERROR_AJOUTER_PERSONNE' :
                    return {
                                 ...state,
                                personneCreated : false,
                                error : action.payload
                    }
                    
        
                    case 'REMOVE_VOITURE_CREATED' : 

                    return {
                        ...state,
                        voitureCreated :  false
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
      
        case "UNDO_DELETE_VOITURE" :
            return {
                ...state,
                voitures : action.payload,
            error : null

            }
        
            case "ADD_TO_CORBEILLE_VOITURE" :
            return {
                ...state,
                voitures :action.payload,
                error : null,

            }
        default :
        return state;
    }

    
}

export default VoitureReducer;