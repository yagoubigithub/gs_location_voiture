import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';




import { connect } from 'react-redux';

import LoadingComponent from '../utils/loadingComponent';
import { getAllClient, searchClient } from '../store/actions/clientAction';
import SousNavClient from './SousNavClient';
import AjouterVoiture from './AjouterVoiture';


//icons
import SearchIcon from '@material-ui/icons/Search';
import ModifierVoiture from './ModifierVoiture';
import ClientTable from './tables/ClientTable';
import AjouterClient from './AjouterClient';
import ModifierClient from './ModifierClient';




class Client extends Component {
  state = {
    clients: [],
    
  }


  componentWillMount() {
    this.props.getAllClient();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.clients !== undefined) {
     

      this.setState({  clients :nexProps.clients});
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
        <SousNavClient />
        <Route path="/client/modifier/:id" component={ModifierClient} />
        
        <form onSubmit={this.handleSearch} className="search-form">
            <input onChange={this.handleSearchChange} type="text" name="nom" placeholder="Nom" />

            <button type="submit" >
              <SearchIcon />
            </button>

          </form>
     
      



      <Route path="/client/ajouter" component={AjouterClient} />

<ClientTable rows={this.state.clients} />

    
     
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth : state.auth,
    clients : state.client.clients,
    loading : state.client.loading

   
  }
}

const mapActionToProps = (dispatch) =>{
  return  {
    getAllClient : ()=>dispatch(getAllClient()),
    searchClient: (data) => dispatch(searchClient(data)),

  }

}
export default connect(mapStateToProps,mapActionToProps)(Client);