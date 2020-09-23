import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";


//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//redux

import { connect } from "react-redux";

import {
  ajouterVoiture,
  removeVoitureCreated
} from "../store/actions/voitureAction";

import LoadingComponent from "../utils/loadingComponent";

class AjouterVoiture extends Component {
  state = {
    open: true,
    nom: "",
    modele: "",
    marque: "",
    annee: "",
    coleur: "",
    matricule: "",
    assurance_debut :  new Date().toISOString().split('T')[0],
    assurance_fin : new Date().toISOString().split('T')[0],
    prix: 0,
    images: []
  };
  constructor(props) {
    super(props);
    
  }
  ajouter = () => {
    const data = { ...this.state };
    delete data.open;
    console.log(data)
    if (data.nom === undefined || !data.nom.trim().length > 0) {
      this.setState({ error: "le champ Nom obligatoire" });
    } else {
      
      this.props.ajouterVoiture(data);
    }
  };
  
  ajouterImage = () =>{
    const file = this.fileInput.files[0];
  
    if(file){
       this.toBase64(file).then((image64)=>{
        const images = [...this.state.images]
        images.push(image64)
        this.setState({images})
        this.fileInput.value = ""
      })
    }
   
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  componentWillReceiveProps(nextProps) {
    if (nextProps.voitureCreated) {
      //
      this.props.removeVoitureCreated();

      this.setState({
        nom: "",
        modele: "",
        marque: "",
        annee: "",
        coleur: "",
        matricule: "",
        prix: 0,
        images: [],
        assurance_debut :  new Date().toISOString().split('T')[0],
        assurance_fin : new Date().toISOString().split('T')[0],
      });
    
    }
  }
  handleChange = e => {
    if (e.target.name === "prix") {
      try {
        const v = parseInt(e.target.value);
        this.setState({ prix: v });
      } catch (error) {}
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  removeImage = index =>{
    const images = [...this.state.images];
    images.splice(index , 1);
    this.setState({images})
  }
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <AppBar className="bg-dark">
          <Toolbar style={{ display: "flax", justifyContent: "space-between" }}>

          <Link to="/voiture/">
              <IconButton onClick={this.handleClose} style={{ color: "white" }}>
               <ArrowBackIcon />
              </IconButton>
            </Link>

            
           
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 49, padding: 15 }}></div>

        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <h1 style={{ textAlign: "center",  }}>Ajouter Voiture</h1>
            <span className="red">{this.state.error}</span>
           
            <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              placeholder="Nom *"
              value={this.state.nom}
              name="nom"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="none"
            />
            </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Modéle"
                  value={this.state.modele}
                  name="modele"
                  variant="outlined"
                  onChange={this.handleChange}
                  fullWidth
                  margin="none"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Marque"
                  value={this.state.marque}
                  name="marque"
                  variant="outlined"
                  onChange={this.handleChange}
                  fullWidth
                  margin="none"
                />
              </Grid>
          

          
              <Grid item xs={6}>
                <TextField
                  placeholder="L'année"
                  value={this.state.annee}
                  name="annee"
                  variant="outlined"
                  onChange={this.handleChange}
                  fullWidth
                  margin="none"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Coleur"
                  value={this.state.coleur}
                  name="coleur"
                  variant="outlined"
                  onChange={this.handleChange}
                  fullWidth
                  margin="none"
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
              placeholder="Matricule"
              value={this.state.matricule}
              name="matricule"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="none"
            />
              </Grid>
             
           <Grid item xs={12}>
           <h2 style={{margin : 0}}>Assurance : </h2>
           </Grid>
              <Grid item xs={6}>
                <h3 style={{margin : 0}}>À partir de</h3>
                
            <TextField
              placeholder="Date début"
              value={this.state.assurance_debut}
              name="assurance_debut"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="none"
              type="date"
             
            />
              </Grid>
              <Grid item xs={6}>
                <h3 style={{margin : 0}}>À </h3>
                <TextField
              placeholder="Date fin"
              value={this.state.assurance_fin}
              name="assurance_fin"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="none"
             
              type="date"
            />
              </Grid>
            </Grid>
            <h3>Prix par jour</h3>
            
           
            <TextField
              placeholder="Prix par jour"
              value={this.state.prix}
              name="prix"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="none"
              type="number"
              inputProps={{ min: "0", step: "1" }}
            />

        <input type={"file"}  accept="image/*" ref={input => (this.fileInput = input)} multiple={false} />
        <button onClick={this.ajouterImage} >Ajouter image</button>
        <div className="image-container">
          {this.state.images.map((image,index)=>{
            return (<div className="image">
            <IconButton onClick={()=>this.removeImage(index)} >
              <CloseIcon></CloseIcon>
            </IconButton>
            <img style={{height : 100, width : 100}}  key={`image-${index}`} src={image} /></div>)
          })}
        </div>

            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.ajouter}
            >
              <SaveIcon />
            </Button>
            <br />
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}
const mapActionToProps = dispatch => {
  return {
    ajouterVoiture: data => dispatch(ajouterVoiture(data)),
    removeVoitureCreated: () => dispatch(removeVoitureCreated())
  };
};
const mapStateToProps = state => {
 
  return {
    loading: state.voiture.loading,
    voitureCreated: state.voiture.voitureCreated
  };
};
export default connect(mapStateToProps, mapActionToProps)(AjouterVoiture);
