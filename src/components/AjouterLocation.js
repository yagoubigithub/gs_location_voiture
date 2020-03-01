import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import {getCurrentDateTime} from '../utils/methods'
import PrintFacture from './PrintFacture'

//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

//redux

import { connect } from "react-redux";

import {
  
  getAllClient,
  searchClient
} from "../store/actions/clientAction";
import { searchVoiture, getAllVoiture } from "../store/actions/voitureAction";
import {  ajouterLocation } from "../store/actions/locationAction";

import LoadingComponent from "../utils/loadingComponent";

import ClientTable from "./tables/ClientTable";
import VoitureTable from "./tables/VoitureTable";

class AjouterLocation extends Component {
  state = {
    open: true,
    nom_client: "",
    number_unite : 1,
    unite : "j",
    clients: [],
    voitures: [],
    client_selected: {},
    voiture_selected: {},
    clientDialog: false,
    voitureDialog: false,
    remise : 0,
    location_selected : []
  };
  ajouter = () => {
    const data = { ...this.state };
    delete data.open;
    delete data.clientDialog;
    delete data.clients;
    delete data.nom_client;
    delete data.voitureDialog;
    delete data.voitures;
   

    if (data.client_selected.nom === undefined) {
      alert("le champ Client obligatoire");
      return;
    }

    if (data.voiture_selected.nom === undefined) {
        alert("le champ Voiture obligatoire");
        return;
    }

    const location = {voiture : data.voiture_selected, client :  data.client_selected , date_sortie : data.date_sortie, date_entree : data.date_entree, remise :data.remise}

    // calcule prix totale
    const timeBetweenSOrtieENtree = new Date(data.date_entree).getTime() - new Date(data.date_sortie).getTime();

   const  prix_totale =  (data.voiture_selected.prix / 24 / 60 /60 /100) * timeBetweenSOrtieENtree - this.state.remise;
    location.prix_totale = prix_totale.toFixed(2);
   
    const location_selected = [{
        client_nom : location.client.nom,
        client_prenom :   location.client.prenom,
        voiture_nom : location.voiture.nom,
        modele :  location.voiture.modele,
        date_sortie :  location.date_sortie,
        date_entree :  location.date_entree,
        remise : location.remise,
        prix_totale : location.prix_totale,
    }];
    this.setState({location_selected})
  this.props.ajouterLocation(location)
  };
  componentDidMount() {
    this.props.getAllClient();
    this.props.getAllVoiture();
    const date_sortie = getCurrentDateTime(new Date().getTime());;
    const date_entree = getCurrentDateTime(new Date(date_sortie).getTime() + 1 * 24 * 60 *60*1000);
    

    this.setState({date_sortie, date_entree})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.clients) {
      //
      const clients = [];

      nextProps.clients.map(client => {
        if (client.status === "undo") {
          clients.push(client);
        }
      });
      this.setState({ clients });
    }
    if (nextProps.voitures) {
      //
      const voitures = [];

      nextProps.voitures.map(voiture => {
        if (voiture.status === "undo" && voiture.disponibilite === "disponible") {
          voitures.push(voiture);
        }
      });
      this.setState({ voitures });
    }
    if(nextProps.locationCreated){
        this.setState({locationCreated :nextProps.locationCreated})

    }
  }
  
  handleClientClose = () => {
    this.setState({
      clientDialog: !this.state.clientDialog
    });
  };
  handleVoitureClose = () => {
    this.setState({
      voitureDialog: !this.state.voitureDialog
    });
  };
  getClientData = client_selected => {
    this.setState({ client_selected });
  };
  getVoitureData = voiture_selected => {
    this.setState({ voiture_selected });
  };
  handleSearchClientChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearchClient = e => {
    e.preventDefault();
    const data = { nom: this.state.nom_client };
    this.props.searchClient(data);
  };

  handleSearchVoitureChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearchVoiture = e => {
    e.preventDefault();
    const data = { nom: this.state.nom_voiture };
    this.props.searchVoiture(data);
  };
  handleNumberChange = (e) =>{
   
    const unite = this.state.unite;
    const number_unite = e.target.value;

    if(unite === "j"){
         const date_sortie = this.state.date_sortie;
    const date_entree = getCurrentDateTime(new Date(date_sortie).getTime() + number_unite * 24 * 60 *60*1000);

    this.setState({date_sortie, date_entree,[e.target.name] : number_unite})
    }else{
        const date_sortie = this.state.date_sortie;
        const date_entree = getCurrentDateTime(new Date(date_sortie).getTime() + number_unite  * 60 *60*1000);
    
        this.setState({date_sortie, date_entree,[e.target.name] : number_unite})   
    }

  }
  handleUniteChange = e =>{
      const unite = e.target.value;

      const number_unite = this.state.number_unite;

    if(unite === "j"){
         const date_sortie = this.state.date_sortie;
    const date_entree = getCurrentDateTime(new Date(date_sortie).getTime() + number_unite * 24 * 60 *60*1000);

    this.setState({date_sortie, date_entree,[e.target.name] : unite})
    }else{
        const date_sortie = this.state.date_sortie;
        const date_entree = getCurrentDateTime(new Date(date_sortie).getTime() + number_unite  * 60 *60*1000);
    
        this.setState({date_sortie, date_entree,[e.target.name] : unite})   
    }

  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
      
     
    return (
      <Dialog fullScreen open={this.state.open}>
       <Dialog fullScreen open={this.state.locationCreated}>
       <PrintFacture ReturnPath="/location/" head={[{ access : "client_nom", value: "Nom client" }, { access : "client_prenom", value: "Prénom" },{ access : "voiture_nom", value: "Voiture" },{ access : "modele", value: "Modéle" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]} rows={this.state.location_selected}  />

       </Dialog>
        <Dialog
          open={this.state.clientDialog}
          maxWidth="lg"
          onClose={this.handleClientClose}
        >
          <form onSubmit={this.handleSearchClient} className="search-form">
            <input
              onChange={this.handleSearchClientChange}
              type="text"
              name="nom_client"
              placeholder="Nom"
            />

            <button type="submit">search</button>
          </form>
          <ClientTable
            sendData={this.getClientData}
            type="choose-one"
            rows={this.state.clients}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClientClose}
          >
            Select
          </Button>
        </Dialog>

        <Dialog
          open={this.state.voitureDialog}
          maxWidth="lg"
          onClose={this.handleVoitureClose}
        >
          <form onSubmit={this.handleSearchVoiture} className="search-form">
            <input
              onChange={this.handleSearchVoitureChange}
              type="text"
              name="nom_voiture"
              placeholder="Nom"
            />

            <button type="submit">search</button>
          </form>
          <VoitureTable
            sendData={this.getVoitureData}
            type="choose-one"
            rows={this.state.voitures}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleVoitureClose}
          >
            Select
          </Button>
        </Dialog>

        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <AppBar color="default">
          <Toolbar>
            <Link to="/location/">
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Link>
            <h4 style={{ textAlign: "center" }}>Ajouter location</h4>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: 100 }}
              onClick={this.ajouter}
            >
              <SaveIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 100, padding: 15 }}></div>

        <Grid container spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <Grid container>
            <Grid item xs={5}>
            <TextField
              label="Nom"
              margin="normal"
              fullWidth
              
              disabled
              onChange={this.handleChange}
              name="nom_client"
              value={
                this.state.client_selected.nom !== undefined
                  ? this.state.client_selected.nom
                  : ""
              }
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              label="Prénom"
              margin="normal"
             
              disabled
              fullWidth
              onChange={this.handleChange}
              name="prenom_client"
              value={
                this.state.client_selected.prenom !== undefined
                  ? this.state.client_selected.prenom
                  : ""
              }
            /> 
            </Grid>
            <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              style={{marginTop : 25}}
             
              onClick={this.handleClientClose}
            >
              <AddIcon />
            </Button>
           
              </Grid>
          </Grid>
           
         

           

          
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <Grid container>
            <Grid item xs={5}>
            <TextField
              label="Nom Voiture"
              margin="normal"
              
              disabled
              fullWidth
              onChange={this.handleChange}
              name="nom_voiture"
              value={
                this.state.voiture_selected.nom !== undefined
                  ? this.state.voiture_selected.nom
                  : ""
              }
              
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              label="Modéle"
              margin="normal"
              
              disabled
              fullWidth
              onChange={this.handleChange}
              name="modele"
              value={
                this.state.voiture_selected.modele !== undefined
                  ? this.state.voiture_selected.modele
                  : ""
              }
              
            />

            </Grid>
            <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: 25 }}
              onClick={this.handleVoitureClose}
            >
              <AddIcon />
            </Button>
            </Grid>
          </Grid>
          </Grid>
       
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <TextField
              
              margin="normal"
              style={{ flex: 1 }}
              
              onChange={this.handleNumberChange}
              type={"number"}
              value={this.state.number_unite}
              name="number_unite"
              inputProps={{ min: "0", step: "1" }}
            />
             <FormControl  style={{ width: 200 ,marginTop : 20}}>
        <InputLabel id="unite-du-temps-select-label">Unité du temps</InputLabel>
        <Select
          labelId="unite-du-temps-select-label"
          defaultValue="j"
          onChange={this.handleUniteChange}
          name="unite"
         
          
        >
          <MenuItem value={"h"}>Heurs</MenuItem>
          <MenuItem value={"j"}>Jours</MenuItem>
          
        </Select>
      </FormControl>

      
          </Grid>
          
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <TextField
              
              margin="normal"
              style={{ flex: 1 }}
              value={this.state.date_sortie}
              onChange={this.handleChange}
              type="datetime-local"
              name="date_sortie"
              
            />

<TextField
              
              margin="normal"
              style={{ flex: 1 }}
              value={this.state.date_entree}
              onChange={this.handleChange}
              type="datetime-local"
              name="date_entree"
              
            />

          </Grid>
          <Grid item xs={8}>

          <TextField
              
              margin="normal"
              style={{ flex: 1 }}
              variant="outlined"
              onChange={this.handleChange}
              type={"number"}
              value={this.state.remise}
              name="remise"
              inputProps={{ min: "0", step: "1" }}
            />
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
const mapActionToProps = dispatch => {
  return {
    ajouterLocation: data => dispatch(ajouterLocation(data)),
    getAllClient: () => dispatch(getAllClient()),
    searchClient: data => dispatch(searchClient(data)),
    getAllVoiture: () => dispatch(getAllVoiture()),
    searchVoiture: data => dispatch(searchVoiture(data))
  };
};
const mapStateToProps = state => {
  return {
    loading: state.client.loading,
    clients: state.client.clients,
    voitures: state.voiture.voitures,
    locationCreated : state.location.locationCreated
  };
};
export default connect(mapStateToProps, mapActionToProps)(AjouterLocation);
