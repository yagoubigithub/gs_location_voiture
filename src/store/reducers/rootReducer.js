

import authReducer from './authReducer';
import voitureReducer from './voitureReducer';
import clientReducer from './clientReducer';
import locationReducer from './locationReducer';
import entrepriseReducer from './entrepriseReducer';


import {    combineReducers } from 'redux';



const rootReducer  = combineReducers({
 
    auth : authReducer,
    voiture : voitureReducer,
    client : clientReducer,
    location : locationReducer,
    entreprise : entrepriseReducer
  
    
});

export default rootReducer;