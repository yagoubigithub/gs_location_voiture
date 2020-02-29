import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar';

import Home from './components/Home';
import Connexion from './components/auth/Connexion';


import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';


//css
import './App.css'
import Voiture from './components/Voiture';
import Client from './components/Client';
import Location from './components/Location';
import Entreprise from './components/auth/Entreprise';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          {this.props.auth.user !== undefined ? <Navbar /> : <Redirect to="/" />}
      
          <div className={"content"}>
            <Switch>
            <Route exact path="/" component={Entreprise} />
              <Route  path="/connexion" component={Connexion} />
              <Route path="/home" component={Home} />
              <Route path="/voiture" component={Voiture} />
              <Route path="/client" component={Client} />
              <Route path="/location" component={Location} />
            </Switch>
          </div>
        </div>


      </Router>
    );
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(App);
