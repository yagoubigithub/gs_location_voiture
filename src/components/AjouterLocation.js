import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import { getCurrentDateTime } from "../utils/methods";


//icons
import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

//redux

import { connect } from "react-redux";

import { getAllClient, searchClient } from "../store/actions/clientAction";
import { searchVoiture, getAllVoiture } from "../store/actions/voitureAction";
import { ajouterLocation } from "../store/actions/locationAction";

import LoadingComponent from "../utils/loadingComponent";

import ClientTable from "./tables/ClientTable";
import VoitureTable from "./tables/VoitureTable";

class AjouterLocation extends Component {
  state = {
    open: true,
    nom_client: "",
    nom_voiture : "",
    numero_cart : "",
    matricule :  "",
    modele : "",
    marque : "",
    number_unite: [],
    unite: [],
    clients: [],
    voitures: [],
    client_selected: {},
    voiture_selected:[] ,
    clientDialog: false,
    voitureDialog: false,
    remise: [],
    location_selected: [],
    more_voiture : [],
    date_sortie : [],
    date_entree  :[]
  };
  ajouter = () => {
    const data = { ...this.state };
   

    if (data.client_selected.nom === undefined) {
      this.setState({error : "le champ Client obligatoire"})
      return;
    }

    if (data.voiture_selected[0] === undefined) {
      this.setState({error : "le champ Voiture obligatoire"})
      return;
    }
    
    const v = [];
    data.voiture_selected.map((voiture,index)=>{
        // calcule prix totale
    const timeBetweenSOrtieENtree =
    new Date(data.date_entree[index]).getTime() -
    new Date(data.date_sortie[index]).getTime();

  const prix_totale =
    (voiture.prix / 24 / 60 / 60 / 100) *
      timeBetweenSOrtieENtree -
    this.state.remise[index];

      v.push({
        voiture ,
        date_entree : data.date_entree[index],
        date_sortie : data.date_sortie[index],
        remise : data.remise[index],
        prix_totale : prix_totale.toFixed(2)
      })
      


    })

    const location = {
      voiture: v,
      client: data.client_selected,
      facture_date : getCurrentDateTime(new Date().getTime())
     
    };

    this.props.ajouterLocation(location);
  };
  componentDidMount() {
    this.props.getAllClient();
    this.props.getAllVoiture();
 

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
        if (
          voiture.status === "undo" &&
          voiture.disponibilite === "disponible"
        ) {
          voitures.push(voiture);
        }
      });
      this.setState({ voitures });
    }
    if (nextProps.locationCreated) {
      this.setState({ locationCreated: nextProps.locationCreated });
      if(nextProps.facture_id){
        const { history } = this.props;
            if (history) history.push('/facture/'+nextProps.facture_id);
            
      }
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
  getVoitureData = voiture => {
   const voiture_selected =  [ ...this.state.voiture_selected];
   
  if(voiture.nom !==undefined){
    voiture_selected.push(voiture);
    const date_sortie = [...this.state.date_sortie];
    const date_entree = [...this.state.date_entree];
    const remise = [...this.state.remise];
    const unite = [...this.state.unite];
    const number_unite = [...this.state.number_unite];
    remise.push(0);
    unite.push("j");
    number_unite.push(1);
    const d_sortie = getCurrentDateTime(new Date().getTime());
const d_entree = getCurrentDateTime(
  new Date(d_sortie).getTime() + 1 * 24 * 60 * 60 * 1000
);

date_entree.push(d_entree);
date_sortie.push(d_sortie)

voiture_selected.map(v_selected=>{
  const voitures = [...this.state.voitures];
  voitures.map((v,index)=>{
    if(v_selected.id===v.id){

       voitures.splice(index,1);
    }
  })
  this.setState({voitures})
})
   
 this.setState({ voiture_selected,date_sortie, date_entree,remise,number_unite,unite });

    
    
  }
      
  };
  handleSearchClientChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearchClient = e => {
    e.preventDefault();
    const data = { nom : this.state.nom_client , prenom : this.state.prenom, numero_cart : this.state.numero_cart};
    this.props.searchClient(data);
  };

  handleSearchVoitureChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearchVoiture = e => {
    e.preventDefault();
    const data = { nom : this.state.nom_voiture, marque : this.state.marque, modele :  this.state.modele, matricule :  this.state.matricule };
    this.props.searchVoiture(data);
  };
  handleNumberChange = (e,index) => {
       const unite = this.state.unite[index];
      const number_unite = [...this.state.number_unite];
      const date_sortie = [...this.state.date_sortie];
      const date_entree = [...this.state.date_entree]
    if (unite === "j") {
      const d_sortie = date_sortie[index];
      const d_entree = getCurrentDateTime(
        new Date(d_sortie).getTime() + e.target.value * 24 * 60 * 60 * 1000
      );
      date_entree[index] = d_entree;
      number_unite[index] = e.target.value;
      
     

      this.setState({
      
        date_entree,
        number_unite
      });
    } else {
      const d_sortie = this.state.date_sortie;
      const d_entree = getCurrentDateTime(
        new Date(d_sortie).getTime() + e.target.value * 60 * 60 * 1000
      );
      date_entree[index] = d_entree;
      number_unite[index] = e.target.value;
      
      this.setState({
      
        date_entree,
        number_unite
      });
    }
  };
  handleUniteChange = (e,index) => {
    const unite = [...this.state.unite];

    const date_sortie = [...this.state.date_sortie];
    const date_entree = [...this.state.date_entree]
    const number_unite = this.state.number_unite[index];

    if (e.target.value === "j") {
      const d_sortie = this.state.date_sortie[index];
      const d_entree = getCurrentDateTime(
        new Date(d_sortie).getTime() + number_unite * 24 * 60 * 60 * 1000
      );
      date_entree[index] = d_entree;
      unite[index] = e.target.value;
      this.setState({  date_entree,  unite });
    } else {
      const d_sortie = this.state.date_sortie;
      const d_entree = getCurrentDateTime(
        new Date(d_sortie).getTime() + number_unite * 60 * 60 * 1000
      );

      date_entree[index] = d_entree;
      unite[index] = e.target.value;
      this.setState({  date_entree,  unite });
    }
  };

  handleChangeArray = (e,index) =>{
    
    const myArray = [...this.state[e.target.name]];
    console.log(myArray,index)

    if(myArray[index] !== undefined){
      myArray[index] = e.target.value;
    }else{
      myArray.push(e.target.value)
    }
    this.setState({[e.target.name] : myArray},()=>{
      console.log(this.state)
    })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
       
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
             
            <input onChange={this.handleSearchClientChange} type="text" name="prenom" placeholder="Prénom" />
            <input onChange={this.handleSearchClientChange} type="text" name="numero_cart" placeholder="Numero de la cart d'identité" />
          

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
              <input onChange={this.handleSearchVoitureChange} type="text" name="matricule" placeholder="Matricule" />
            <input onChange={this.handleSearchVoitureChange} type="text" name="modele" placeholder="Modéle" />
            <input onChange={this.handleSearchVoitureChange} type="text" name="marque" placeholder="Marque" />

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
         <AppBar className="bg-dark">
          <Toolbar style={{display : "flax", justifyContent : "space-between"}}>

          <h4 style={{ textAlign: "center" }}>Ajouter location</h4>

            <Link to="/location/">
              <IconButton onClick={this.handleClose} style={{color : "white"}}>
                <CloseIcon />
              </IconButton>
            </Link>
        
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 50, padding: 15 }}></div>

        <Grid container spacing={4} >

          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <span className="red">{this.state.error}</span>
          <h3 style={{margin : 0}}>Client :</h3>
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
                  style={{ marginTop: 25 }}
                  onClick={this.handleClientClose}
                >
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}></Grid>

         
        
        </Grid>

<br />
<Grid container spacing={4}>

<Grid item xs={2}></Grid>
  <Grid item xs={8}>
  <h3 style={{margin : 0}}>Voiture {1} : </h3>
    <Grid container>
    
     
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

  
          {this.state.voiture_selected.map((voiture,index)=>{

return (<Grid key={`grid_of_voiture_select${index }`} container spacing={4}
  style={{padding : 50,margin : 5}}>
<h3>Voiture nom : {voiture.nom}</h3>
   <Grid item xs={2}></Grid>
     

     <Grid item xs={2}></Grid>
     <Grid item xs={2}></Grid>
     <Grid item xs={8}>
     <h3 style={{margin : 0}}>Nombre de jours ou heurs :</h3>
       <Grid container>
         <Grid item xs={8}>

           <TextField
             margin="normal"
             fullWidth
             onChange={(e)=>this.handleNumberChange(e,index )}
             type={"number"}
             value={this.state.number_unite[index   ]}
             name="number_unite"
             inputProps={{ min: "0", step: "1" }}
           />
         </Grid>
         <Grid item xs={2}>
           <FormControl fullWidth>
             <InputLabel id="unite-du-temps-select-label">
               Unité du temps
             </InputLabel>
             <Select
               labelId="unite-du-temps-select-label"
               defaultValue="j"
               onChange={(e)=>this.handleUniteChange(e,index)}
               name="unite"
             >
               <MenuItem value={"h"}>Heurs</MenuItem>
               <MenuItem value={"j"}>Jours</MenuItem>
             </Select>
           </FormControl>
         </Grid>
       </Grid>
     </Grid>

     <Grid item xs={2}></Grid>
     <Grid item xs={2}></Grid>
     <Grid item xs={8}>
       <Grid container spacing={1}>
         <Grid item xs={5}>
        <h3 style={{margin : 0}}>Date Sortie du Voiture :</h3>
           <TextField
             margin="normal"
             style={{ flex: 1 }}
             value={this.state.date_sortie[ index  ]}
             onChange={(e)=>this.handleChangeArray(e,index )}
             type="datetime-local"
             name="date_sortie"
             fullWidth
           />
         </Grid>

         <Grid item xs={5}>
         <h3 style={{margin : 0}}>Date Entrée du Voiture :</h3>
           <TextField
             margin="normal"
             style={{ flex: 1 }}
             value={this.state.date_entree[index ]}
             onChange={(e)=>this.handleChangeArray(e,index )}
             type="datetime-local"
             name="date_entree"
             fullWidth
           />
         </Grid>
       </Grid>
     </Grid>
     <Grid item xs={2}></Grid>
     <Grid item xs={2}></Grid>
     <Grid item xs={7}>
     <h3 style={{margin : 0}}>Remise :</h3>
       <TextField
         margin="normal"
         style={{ flex: 1 }}
         variant="outlined"
         onChange={(e)=>this.handleChangeArray(e,index )}
         type={"number"}
         value={this.state.remise[index  ]}
         name="remise"
         inputProps={{ min: "0", step: "1" }}
         fullWidth
       />
     </Grid></Grid>)
          })}

        
        </Grid>
        <br />
        <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.ajouter}
              style={{width : "80%", margin : "0 auto"}}
            >
              <SaveIcon />
            </Button>
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
    locationCreated: state.location.locationCreated,
    facture_id : state.location.facture_id
  };
};
export default connect(mapStateToProps, mapActionToProps)(AjouterLocation);
