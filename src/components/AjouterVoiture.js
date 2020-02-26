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
import Voiture from "./Voiture";
import LoadingComponent from "../utils/loadingComponent";



class AjouterVoiture extends Component {
  state = {
    open: true
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
        <div style={{ marginTop: 100, padding: 15 }}></div>

    
            <Grid container >
                <Grid item xs={2}></Grid>
              <Grid item xs={6}>
                <TextField placeholder="Nom *" name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Modéle" name="modele" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Marque" name="marque" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="L'année" name="annee" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Coleur" name="coleur" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Matricule" name="matricule" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                
                <UploadImage placeholder="Images" multiple  onChange={this.handleChangeImage} />
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
        loading : state.voiture.loading
    }
}
export default connect(mapStateToProps,mapActionToProps)(AjouterVoiture)  ;