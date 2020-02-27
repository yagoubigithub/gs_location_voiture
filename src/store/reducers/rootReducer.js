

import authReducer from './authReducer';
import voitureReducer from './voitureReducer';
import clientReducer from './clientReducer';


import {    combineReducers } from 'redux';



const rootReducer  = combineReducers({
 
    auth : authReducer,
    voiture : voitureReducer,
    client : clientReducer
  
    
});

export default rootReducer;