import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

//redux
import {connect} from 'react-redux';
import { getAllClient } from '../store/actions/clientAction';
 class SousNavClient extends Component {
    render() {
        return (
            <div>
          <Grid container className="sous-nav-container">
          <Grid item xs={2}>
                        <NavLink className="sous-nav-link" onClick={this.props.getAllClient}  to='/location'>Actualisé</NavLink>
                    </Grid>
                    <Grid item xs={2}>
                        <NavLink className="sous-nav-link" to='/location/ajouter'>Ajouter</NavLink>
                    </Grid>
                   
                <Grid item xs={2}>
                    <NavLink className="sous-nav-link" to="/location/print">Imprimer</NavLink>
                </Grid>
              
                </Grid>
                
            </div>
        )
    }
}


const mapActionToProps = dispatch =>{
    return {
        getAllClient : ()=>dispatch(getAllClient())
    }
}
export default connect(null,mapActionToProps)(SousNavClient);