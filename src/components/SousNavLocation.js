import React, { Component } from 'react'
import { NavLink,Link } from 'react-router-dom';


//redux
import {connect} from 'react-redux';
import { getAllClient } from '../store/actions/clientAction';
 class SousNavClient extends Component {
    render() {
        return (
            <div className="sous-nav-container">
         
            <NavLink  onClick={this.props.getAllClient}  to='/location'><button className="btn btn-nav">Actualisé</button></NavLink>
       
            <NavLink  to='/location/ajouter'><button className="btn btn-nav">Ajouter</button></NavLink>
        
       
    
  
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