import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';

import { Tab, Tabs } from "react-tabs-css";


import VoitureTable from './tables/VoitureTable'



import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';
import { getAllVoiture } from '../store/actions/voitureAction';






class Voiture extends Component {
  state = {
    voitures: []
  }


  componentWillMount() {
    this.props.getAllVoiture();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.voitures !== undefined) {
      
      this.setState({ voitures: nexProps.voitures });
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
        <Tab index={0} title="Liste des Voiture">
         
         <VoitureTable rows={this.state.voitures} />
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
 
  
    auth : state.auth,
    voitures : state.voiture.voitures

   
  }
}

const mapActionToProps = (dispatch) =>{
  return  {
    getAllVoiture : ()=>dispatch(getAllVoiture())

  }

}
export default connect(mapStateToProps,mapActionToProps)(Voiture);