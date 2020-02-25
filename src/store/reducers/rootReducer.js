

import authReducer from './authReducer';
import voitureReducer from './voitureReducer';


import {    combineReducers } from 'redux';



const rootReducer  = combineReducers({
 
    auth : authReducer,
    voiture : voitureReducer
  
    
});

export default rootReducer;