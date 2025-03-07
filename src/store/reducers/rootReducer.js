

import authReducer from './authReducer';
import voitureReducer from './voitureReducer';
import clientReducer from './clientReducer';
import locationReducer from './locationReducer';
import entrepriseReducer from './entrepriseReducer';
import factureReducer from './factureReducer';


import {    combineReducers } from 'redux';



const rootReducer  = combineReducers({
 
    auth : authReducer,
    voiture : voitureReducer,
    client : clientReducer,
    location : locationReducer,
    entreprise : entrepriseReducer,
    facture : factureReducer
  
    
});

export default rootReducer;