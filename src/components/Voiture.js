import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';

import { Tab, Tabs } from "react-tabs-css";


import VoitureTable from './tables/VoitureTable'



import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';
import { getAllVoiture, searchVoiture } from '../store/actions/voitureAction';
import SousNavVoiture from './SousNavVoiture';
import AjouterVoiture from './AjouterVoiture';


//icons
import SearchIcon from '@material-ui/icons/Search';
import ModifierVoiture from './ModifierVoiture';




class Voiture extends Component {
  state = {
    voitures: [],
    voitureCorebeille : [],
    voitureDisponible : [],
     voitureEnPane : [],
     voitureLocation : [],
  }


  componentWillMount() {
    this.props.getAllVoiture();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.voitures !== undefined) {
      const voitures = [];
      const voitureDisponible = [];
      const voitureEnPane = [];
      const voitureLocation = [];
      const voitureCorebeille = [];

      nexProps.voitures.map(voiture=>{
       
        if( voiture.status === "undo"){
          voitures.push(voiture);

        }
        if(voiture.disponibilite === "disponible" && voiture.status === "undo"){
          voitureDisponible.push(voiture);

        }
        if(voiture.disponibilite === "enPane" && voiture.status === "undo"){
          voitureEnPane.push(voiture);

        }
        if(voiture.disponibilite === "enLocation" && voiture.status === "undo"){
          voitureLocation.push(voiture);

        }
        if(voiture.status === "corbeille")
        {
          voitureCorebeille.push(voiture);
        }
      })
      
      this.setState({ voitures,voitureCorebeille,voitureDisponible,voitureEnPane,voitureLocation,loading : nexProps.loading });
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
    this.props.searchVoiture(data)
  }
  render() {
    if(this.props.auth.user ===  undefined){
      return (<Redirect to="/" />)
    }
    return (
      <div>
        <LoadingComponent loading={this.state.loading !== undefined ? this.state.loading : false} />
        <SousNavVoiture />
        <Route path="/voiture/modifier/:id" component={ModifierVoiture} />
        
        <form onSubmit={this.handleSearch} className="search-form">
            <input onChange={this.handleSearchChange} type="text" name="nom" placeholder="Nom" />

            <button type="submit" >
              <SearchIcon />
            </button>

          </form>
        <Tabs >
        <Tab index={0} title="Liste des Voiture">
         
         <VoitureTable rows={this.state.voitures} />
        </Tab>
 
        <Tab index={1} title="Voiture disponible" 
        >
         <VoitureTable rows={this.state.voitureDisponible} />
         
        </Tab>
        <Tab index={2} title="Corbeille" 
        >
         <VoitureTable rows={this.state.voitureCorebeille} />
         
        </Tab>
      </Tabs>
      



      <Route path="/voiture/ajouter" component={AjouterVoiture} />


    
     
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth : state.auth,
    voitures : state.voiture.voitures,
    loading : state.voiture.loading

   
  }
}

const mapActionToProps = (dispatch) =>{
  return  {
    getAllVoiture : ()=>dispatch(getAllVoiture()),
    searchVoiture: (data) => dispatch(searchVoiture(data)),

  }

}
export default connect(mapStateToProps,mapActionToProps)(Voiture);