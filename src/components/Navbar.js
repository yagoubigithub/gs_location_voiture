import React, { Component } from "react";



import { NavLink } from "react-router-dom";




// redux
import {connect} from 'react-redux';

class Navbar extends Component {
  render() {
  
 
    return (
      <nav className="nav">
        <div className="navbar">
          <h2 className="project-title">{this.props.auth.user.employe && this.props.auth.user.employe}</h2>
         
          <NavLink activeClassName="nav-active" to="/voiture" className="nav-link">
        Voiture{" "}
      </NavLink>
      <NavLink activeClassName="nav-active" to="/client" className="nav-link">
        Client{" "}
      </NavLink>
      <NavLink activeClassName="nav-active" to="/location" className="nav-link">
        Location{" "}
      </NavLink>
      <NavLink activeClassName="nav-active" to="/facture" className="nav-link">
        Facture{" "}
      </NavLink>
      <NavLink activeClassName="nav-active" to="/agence" className="nav-link">
        Agence{" "}
      </NavLink>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state =>{
  return {
    access :  state.auth.user.access,
    auth  : state.auth
  }
}
export default connect(mapStateToProps)(Navbar);
