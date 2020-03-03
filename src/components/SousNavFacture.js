import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

//redux
import {connect} from 'react-redux';
import { getAllFacture } from '../store/actions/factureAction';
 class SousNavFacture extends Component {
    render() {
        return (
            <div>
          <Grid container className="sous-nav-container">
          <Grid item xs={2}>
                        <NavLink className="sous-nav-link" onClick={this.props.getAllFacture}  to='/facture'>Actualisé</NavLink>
                    </Grid>
               
                   
            
              
                </Grid>
                
            </div>
        )
    }
}


const mapActionToProps = dispatch =>{
    return {
        getAllFacture : ()=>dispatch(getAllFacture())
    }
}
export default connect(null,mapActionToProps)(SousNavFacture);