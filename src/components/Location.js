import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';



import { Tab, Tabs } from "react-tabs-css";
import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';
import { getAllLocation, searchLocation } from '../store/actions/locationAction';
import {getEtreprise} from './../store/actions/entrepriseAction'


//icons
import SearchIcon from '@material-ui/icons/Search';

import AjouterClient from './AjouterClient';
import ModifierClient from './ModifierClient';
import SousNavLocation from './SousNavLocation';
import LocationTable from './tables/LocationTable';
import AjouterLocation from './AjouterLocation';
import PrintFacture from './PrintFacture';




class Location extends Component {
  state = {
    locations: [],
    locationCorebeille : []
    
  }


  componentWillMount() {
    this.props.getAllLocation();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.locations !== undefined) {
      const locations = [];
      const locationCorebeille = [];
     nexProps.locations.map(location=>{
       if(location.status === "undo"){
         locations.push(location)

       }
       if(location.status === "corbeille"){
         locationCorebeille.push(location)
       }
     })
    
        this.setState({  locations ,locationCorebeille,loading : nexProps.loading});
    }
    if(nexProps.entreprise !== undefined){
      this.setState({  entreprise :  nexProps.entreprise}); 
    }
   
  }

  handleSearchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  handleSearch = (e) => {
    e.preventDefault();
    const data = { nom : this.state.nom };
    this.props.searchClient(data)
  }
  render() {
    if(this.props.auth.user ===  undefined){
      return (<Redirect to="/" />)
    }
    return (
      <div>
        <LoadingComponent loading={this.state.loading !== undefined ? this.state.loading : false} />
        <SousNavLocation />
        <Route path="/location/modifier/:id" component={ModifierClient} />
        
        <form onSubmit={this.handleSearch} className="search-form">
            <input onChange={this.handleSearchChange} type="text" name="nom" placeholder="Nom" />
            <button type="submit" >
              <SearchIcon />
            </button>
          </form>
         
         
      



      <Route path="/location/ajouter" component={AjouterLocation} />

      <Route
         
         path='/location/print/:id'
         component={(props) =>  <PrintFacture {...props} rows={
           this.state.locations.filter(l=>props.match.params.id==l.id)
        
         } entreprise={this.state.entreprise}  ReturnPath="/location/" head={[{ access : "voiture_nom", value: "Voiture" },{ access : "modele", value: "Modéle" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]}   />}
       />

<Tabs >
        <Tab index={0} title="Les locations">
         
         <LocationTable rows={this.state.locations}  />
        </Tab>
 
        
        <Tab index={1} title="Corbeille" 
        >
         <LocationTable rows={this.state.locationCorebeille} type="corbeille" />
         
        </Tab>
      </Tabs>
     
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth : state.auth,
    locations : state.location.locations,
    loading : state.location.loading,
    location : state.location.location,
    entreprise :  state.entreprise.info

   
  }
}

const mapActionToProps = (dispatch) =>{
  return  {
    getAllLocation : ()=>dispatch(getAllLocation()),
    searchLocation: (data) => dispatch(searchLocation(data)),
    getEtreprise :  ()=>dispatch(getEtreprise())

  }

}
export default connect(mapStateToProps,mapActionToProps)(Location);