import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import UploadImage from 'yagoubi-upload-images';

//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import {connect} from 'react-redux';

import {ajouterVoiture} from '../store/actions/voitureAction'

import LoadingComponent from "../utils/loadingComponent";



class AjouterVoiture extends Component {
  state = {
    open: true,
    nom : "",
    modele : "", marque : "",annee :  "" , coleur : "", matricule :  "", prix : 0, images : []
  };
  ajouter = () =>{
    const data = {...this.state}
    delete data.open;
    if(data.nom === undefined || !data.nom.trim().length > 0){
        alert("le champ Nom obligatoire")
    }else{
         this.props.ajouterVoiture(data);
    }
  }
  componentWillReceiveProps (nextProps){
      if(nextProps.voitureCreated){
         //
         this.setState({nom : "",modele : "", marque : "",annee :  "" , coleur : "", matricule :  "", prix : 0, images : []})
         
      }

  }
  handleChange = (e) =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
  handleChangeImage = (files) =>{
      const images = []
      files.map(file=>{
          images.push(file.path)
      })
      this.setState({images})
  }
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
          <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
        <AppBar color="default">
          <Toolbar>
            <Link to="/voiture/">
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Link>
            <h4 style={{ textAlign: "center" }}>Ajouter Voiture</h4>
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
        <div style={{ marginTop: 40, padding: 15 }}></div>

    
            <Grid container >
                <Grid item xs={2}></Grid>
              <Grid item xs={6}>
                <TextField placeholder="Nom *" value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Modéle" value={this.state.modele} name="modele" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Marque" value={this.state.marque} name="marque" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="L'année" value={this.state.annee} name="annee" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Coleur" value={this.state.coleur} name="coleur" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Matricule" value={this.state.matricule} name="matricule" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Prix par jour" value={this.state.prix} name="prix" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" type="number" inputProps={{ min: "0", step: "1" }} />
                
                <UploadImage placeholder="Images"  multiple  onChange={this.handleChangeImage} />
                <br />
              </Grid>
             
             
            </Grid>
          
         
       
      </Dialog>
    );
  }
}
const mapActionToProps = (dispatch) =>{
    return {
        ajouterVoiture : (data)=> dispatch(ajouterVoiture(data))
    }

}
const mapStateToProps = (state) => {
    return {
        loading : state.voiture.loading,
        voitureCreated : state.voiture.voitureCreated
    }
}
export default connect(mapStateToProps,mapActionToProps)(AjouterVoiture)  ;