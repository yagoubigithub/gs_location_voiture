const initStat = {
    error :null,
   
};
const factureReducer = (state = initStat, action) =>{
    switch(action.type){

        case 'LOADING_FACTURE' :
            return{
                ...state,
                loading : true
            }
        case 'STOP_LOADING_FACTURE' :
            return {
                ...state,
                loading : false
            }
        case 'FACTURE_ERROR' :
            return {
                ...state,
                error : action.payload
            }
        
            case 'GET_ONE_FACTURE' : 
            return {
                ...state,
                error :null,
                facture : action.payload
            }
        case 'GET_ALL_FACTURE' :
        return {
            ...state,
            factures :  action.payload,
            error : null
        }
           
        default :
        return {
            ...state
        }

    }

}
export default factureReducer;