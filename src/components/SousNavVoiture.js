import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

//redux
import {connect} from 'react-redux';
import { getAllVoiture } from '../store/actions/voitureAction';
 class SousNavVoiture extends Component {
    render() {
        return (
            <div>
          <Grid container className="sous-nav-container">
          <Grid item xs={2}>
                        <NavLink className="sous-nav-link" onClick={this.props.getAllVoiture}  to='/voiture'>Voiture</NavLink>
                    </Grid>
                    <Grid item xs={2}>
                        <NavLink className="sous-nav-link" to='/voiture/ajouter'>Ajouter</NavLink>
                    </Grid>
                   
                <Grid item xs={2}>
                    <NavLink className="sous-nav-link" to="/voiture/print">Imprimer</NavLink>
                </Grid>
                <Grid item xs={2}>
                    <NavLink className="sous-nav-link" to="/voiture/corbeille">Corbeille</NavLink>
                </Grid>
                </Grid>
                
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