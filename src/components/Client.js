import React, { Component } from 'react'

import { Route,Redirect } from 'react-router-dom';



import { Tab, Tabs } from "react-tabs-css";
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
    clientCorebeille : []
    
  }


  componentWillMount() {
    this.props.getAllClient();
  }

  componentWillReceiveProps(nexProps) {

    if (nexProps.clients !== undefined) {
      const clients = [];
      const clientCorebeille = [];
     nexProps.clients.map(client=>{
       if(client.status === "undo"){
         clients.push(client)

       }
       if(client.status === "corbeille"){
         clientCorebeille.push(client)
       }
     })

      this.setState({  clients ,clientCorebeille});
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



<Tabs >
        <Tab index={0} title="Liste des Client">
         
         <ClientTable rows={this.state.clients}  />
        </Tab>
 
        
        <Tab index={1} title="Corbeille" 
        >
         <ClientTable rows={this.state.clientCorebeille} type="corbeille" />
         
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