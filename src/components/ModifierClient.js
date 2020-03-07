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
import { TextField, Snackbar, Checkbox, FormControlLabel } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import {connect} from 'react-redux';

import {getClient, modifierClient,removeClientEdited} from '../store/actions/clientAction'

import LoadingComponent from "../utils/loadingComponent";



class AjouterClient extends Component {
  state = {
    open: true,
    nom : "",
   numero_cart :  "",
    prenom :"",
    telephone :"",
    email :"",
    adresse :"",
    date_naissance : "",
    confianceChecked :  false,
    confianceDialog :  false,
    confiance :  "confiance"

  };
  componentWillMount(){
    const id =  this.props.match.params.id;

    this.props.getClient(id);


  }
 
  componentWillReceiveProps (nextProps){
      if(nextProps.clientEdited){
         //
        
          // client edited alert success
          this.setState({clientEdited : nextProps.clientEdited})
          
       
         
      }
      if(nextProps.client){
        console.log(nextProps.client.confiance)
        this.setState({...nextProps.client,confianceChecked : nextProps.client.confiance === "confiance"})
    }

  }
  modifier = () =>{
   
    const data = {...this.state}
    console.log(data);
    delete data.open;
    delete data.confianceDialog;
    if(data.nom === undefined || !data.nom.trim().length > 0){
        alert("le champ Nom obligatoire")
    }else{
         this.props.modifierClient(data);
    }
  }
  handleChange = (e) =>{
      this.setState({
          [e.target.name] : e.target.value
      })
    
  }
  handleCloseSnack = () =>{
    this.props.removeClientEdited();
}
handleChackBoxChange  =  e => {

if(this.state.confianceChecked){
  this.handleOpenCloseConfianceDialog();
  this.setState({ confianceChecked : false})
}else{
  this.setState({confianceChecked : true,confiance: "confiance"})
}

}

handleOpenCloseConfianceDialog = () =>{
  
  console.log(this.state.confiance)
  this.setState({confianceDialog : !this.state.confianceDialog})
}
handleClose = () =>{
  this.props.removeClientEdited();
}

 
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
          <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />


          <Dialog open={this.state.confianceDialog} onClose={this.handleOpenCloseConfianceDialog}>
          <TextField multiline type="text" placeholder="Pour quoi?" 
          value={this.state.confiance === "confiance" ? "" :this.state.confiance } name="confiance" variant="outlined" onChange={this.handleChange} fullWidth margin="normal"/>
          <button onClick={() => { this.handleOpenCloseConfianceDialog() }}>ok</button>
          <button onClick={this.handleOpenCloseConfianceDialog}>Cancel</button>

        </Dialog>

        <AppBar className="bg-dark">
       <Toolbar style={{display : "flax", justifyContent : "space-between"}}>
           
            <h4 style={{ textAlign: "center" }}>Modifier Client</h4>

            <Link to="/client/">
              <IconButton onClick={this.handleClose}  style={{color : "white"}}>
                <CloseIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 40, padding: 15 }}></div>

    
            <Grid container >
                <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <Grid container>
                <Grid item xs={6}>
                <h3 style={{margin : 0}}>Nom *</h3>
                
                <TextField placeholder="Nom *"  value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={6}>
                <h3 style={{margin : 0}}>Prénom </h3>
                <TextField placeholder="Prénom"  value={this.state.prenom} name="prenom" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={6}>
<h3 style={{margin : 0}}>P.CN°</h3>
                <TextField placeholder="P.CN°" value={this.state.numero_cart} name="numero_cart" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={6}>
 <h3 style={{margin : 0}}>Télephone</h3>
                <TextField placeholder="Télephone"  value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
</Grid>
              </Grid>
            
              <h3 style={{margin : 0}}>Date de naissance</h3>
                <TextField placeholder="Date de naissance"  value={this.state.date_naissance} name="date_naissance" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                
              
                <h3 style={{margin : 0}}>Adresse</h3>
                <TextField placeholder="Adresse"  value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <h3 style={{margin : 0}}>Email</h3>
                <TextField placeholder="Email"  value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <FormControlLabel
        control={
          <Checkbox checked={this.state.confianceChecked}   onChange={this.handleChackBoxChange}  />
        }
        label="Confiance"
      />
               <br />
              {this.state.confiance !== "confiance" ? <p>{this.state.confiance}</p> :null}

              <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.modifier}
              
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
        modifierClient : (data)=> dispatch(modifierClient(data)),
        getClient :  (id) => dispatch(getClient(id)),
        removeClientEdited : ()=>dispatch(removeClientEdited())
    }

}
const mapStateToProps = (state) => {
    return {
        loading : state.client.loading,
        clientEdited : state.client.clientEdited,
        client :  state.client.client
    }
}
export default connect(mapStateToProps,mapActionToProps)(AjouterClient)  ;