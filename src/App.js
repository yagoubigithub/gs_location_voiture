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


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          {this.props.auth.user !== undefined ? <Navbar /> : <Redirect to="/" />}
      
          <div className={"content"}>
            <Switch>
              <Route exact path="/" component={Connexion} />
              <Route path="/home" component={Home} />
              <Route path="/voiture" component={Voiture} />
          
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
