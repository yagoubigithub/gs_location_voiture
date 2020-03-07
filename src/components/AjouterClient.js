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

import {ajouterClient} from '../store/actions/clientAction'

import LoadingComponent from "../utils/loadingComponent";



class AjouterClient extends Component {
  state = {
    open: true,
    nom : "",
    prenom :"",
    numero_cart : "",
    telephone :"",
    email :"",
    date_naissance : "",
    adresse :""
  };
  ajouter = () =>{
    const data = {...this.state}
    delete data.open;
    if(data.nom === undefined || !data.nom.trim().length > 0){
        this.setState({error : "le champ Nom obligatoire"})
    }else{
         this.props.ajouterClient(data);
    }
  }
  componentWillReceiveProps (nextProps){
      if(nextProps.clientCreated){
         //
         this.setState({ nom : "",
         error :  "",
         date_naissance : "",
         prenom :"",
         numero_cart : "",
         telephone :"",
         email :"",
         adresse :""})
         
      }

  }
  handleChange = (e) =>{
      this.setState({
          [e.target.name] : e.target.value
      })
  }
 
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
          <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
        <AppBar className="bg-dark">
          <Toolbar style={{display : "flax", justifyContent : "space-between"}} >
            
            <h2 style={{ textAlign: "center" }}>Ajouter Client</h2>

            <Link to="/client/">
              <IconButton onClick={this.handleClose} style={{color : "white"}} >
                <CloseIcon  />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 50, padding: 15 }}></div>

    
            <Grid container >
                <Grid item xs={3}></Grid>
              <Grid item xs={6}>
              <span className="red">{this.state.error}</span>
                <TextField placeholder="Nom *" value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Prénom" value={this.state.prenom} name="prenom" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
               
                <TextField placeholder="Date de naissance" value={this.state.date_naissance} name="date_naissance" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />

                <TextField placeholder="P.CN°" value={this.state.numero_cart} name="numero_cart" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Télephone" value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Adresse" value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Email" value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
              
               <br />
               <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.ajouter}
              
            >
              <SaveIcon />
            </Button>
              </Grid>
             
             
            </Grid>
          
         
       
      </Dialog>
    );
  }
}
const mapActionToProps = (dispatch) =>{
    return {
        ajouterClient : (data)=> dispatch(ajouterClient(data))
    }

}
const mapStateToProps = (state) => {
    return {
        loading : state.client.loading,
        clientCreated : state.client.clientCreated
    }
}
export default connect(mapStateToProps,mapActionToProps)(AjouterClient)  ;