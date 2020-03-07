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
    nom : "",
    matricule :  "",
    modele :  "",
    marque :  "",
    voitures: [],
    voitureCorebeille : [],
    voitureDisponible : [],
     voitureEnPane : [],
     voitureLocation : [],
    
  }


  componentDidMount() {
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
        if(voiture.disponibilite === "loué" && voiture.status === "undo"){
          voitureLocation.push(voiture);

        }
        if(voiture.status === "corbeille")
        {
          voitureCorebeille.push(voiture);
        }
      })
      
      this.setState({ voitures,voitureCorebeille,voitureDisponible,voitureEnPane,voitureLocation });
    }
   
   
  }

  handleSearchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  handleSearch = (e) => {
    e.preventDefault();
    const data = { nom : this.state.nom, marque : this.state.marque, modele :  this.state.modele, matricule :  this.state.matricule };
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
            <input onChange={this.handleSearchChange} type="text" name="matricule" placeholder="Matricule" />
            <input onChange={this.handleSearchChange} type="text" name="modele" placeholder="Modéle" />
            <input onChange={this.handleSearchChange} type="text" name="marque" placeholder="Marque" />
          

            <button type="submit" >
              <SearchIcon />
            </button>

          </form>
        <Tabs >
        <Tab index={0} title="tous les voitures">
         
         <VoitureTable rows={this.state.voitures} />
        </Tab>
 
        <Tab index={1} title="voitures disponible" 
        >
         <VoitureTable rows={this.state.voitureDisponible} />
         
        </Tab>
        <Tab index={2} title="voitures Loué" 
        >
         <VoitureTable rows={this.state.voitureLocation} />
         
        </Tab>
        <Tab index={3} title="voitures En Panne" 
        >
         <VoitureTable rows={this.state.voitureEnPane} />
         
        </Tab>
        <Tab index={4} title="Corbeille" 
        >
         <VoitureTable rows={this.state.voitureCorebeille}  type={"corbeille"} />
         
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