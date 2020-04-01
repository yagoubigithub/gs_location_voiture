import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

//redux
import {connect} from 'react-redux';
import { getAllVoiture } from '../store/actions/voitureAction';
 class SousNavVoiture extends Component {
    render() {
        return (
          
          <div className="sous-nav-container">
       
                        <NavLink  onClick={this.props.getAllVoiture}  to='/voiture'><button className="btn btn-nav">Actualisé</button></NavLink>
                    
                        <NavLink  to='/voiture/ajouter'><button className="btn btn-nav">Ajouter</button></NavLink>
                 
                   
            
              
                </div>
                
          
        )
    }
}


const mapActionToProps = dispatch =>{
    return {
        getAllVoiture : ()=>dispatch(getAllVoiture())
    }
}
export default connect(null,mapActionToProps)(SousNavVoiture);