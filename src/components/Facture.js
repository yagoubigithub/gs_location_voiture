import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';



import { Tab, Tabs } from "react-tabs-css";
import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';
import { getAllFacture } from '../store/actions/factureAction';



//icons
import SearchIcon from '@material-ui/icons/Search';

import LocationTable from './tables/LocationTable';
import FactureTable from './tables/FactureTable';
import SousNavFacture from './SousNavFacture';




class Facture extends Component {
  state = {
    factures: []
    
  }


  componentWillMount() {
    this.props.getAllFacture();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.factures !== undefined) {
      
     
    
        this.setState({  factures : nexProps.factures,loading : nexProps.loading});
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
       <SousNavFacture />
       
        
        <form onSubmit={this.handleSearch} className="search-form">
          { /*   <input onChange={this.handleSearchChange} type="text" name="nom" placeholder="Nom" />
            <button type="submit" >
              <SearchIcon />
            </button> */}
          </form>
         
         
      



     


<Tabs >
        <Tab index={0} title="Factures">
         
         <FactureTable rows={this.state.factures}  />
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
    factures : state.facture.factures,
    loading : state.facture.loading,
    entreprise :  state.entreprise.info

   
  }
}

const mapActionToProps = (dispatch) =>{
  return  {
    getAllFacture : ()=>dispatch(getAllFacture()),
   
  }

}
export default connect(mapStateToProps,mapActionToProps)(Facture);