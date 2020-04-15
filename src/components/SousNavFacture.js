import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

//redux
import {connect} from 'react-redux';
import { getAllFacture } from '../store/actions/factureAction';
 class SousNavFacture extends Component {
    render() {
        return (
            <div className="sous-nav-container">
           <NavLink  onClick={this.props.getAllFacture}  to='/facture'><button className="btn btn-nav">Actualisé</button></NavLink>
                
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