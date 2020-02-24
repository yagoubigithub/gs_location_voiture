import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';

import { Tab, Tabs } from "react-tabs-css";


import VoitureTable from './tables/VoitureTable'



import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';






class Voiture extends Component {
  state = {
    personnes: []
  }


  componentWillMount() {
  //  this.props.getAllPersonne();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.voiture !== undefined) {
      this.setState({ voiture: nexProps.voiture });
    }
  }
  render() {
    if(this.props.auth.user ===  undefined){
      return (<Redirect to="/" />)
    }
    return (
      <div>
        <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
        <Tabs >
        <Tab index={0} title="Tab 1">
          <h1>Tab 1</h1>
          <input type="text" placeholder="tab 1"/>
        </Tab>
 
        <Tab index={1} title="Tab 2" 
        >
          <h2>Tab 2</h2>
          <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
         
        </Tab>
      </Tabs>
      



      


    
     
      </div>
    )
  }
}
const mapStateToProps = (state) => {

  return {
 
  
    auth : state.auth
   
  }
}

export default connect(mapStateToProps)(Voiture);