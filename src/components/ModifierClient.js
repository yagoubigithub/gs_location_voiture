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
   
    prenom :"",
    telephone :"",
    email :"",
    adresse :"",
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


        <AppBar color="default">
          <Toolbar>
            <Link to="/client/">
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Link>
            <h4 style={{ textAlign: "center" }}>Modifier Client</h4>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: 100 }}
              onClick={this.modifier}
              
            >
              <SaveIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 100, padding: 15 }}></div>

    
            <Grid container >
                <Grid item xs={2}></Grid>
              <Grid item xs={6}>
                <TextField placeholder="Nom *"  value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Prénom"  value={this.state.prenom} name="prenom" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Télephone"  value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Adresse"  value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Email"  value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <FormControlLabel
        control={
          <Checkbox checked={this.state.confianceChecked}   onChange={this.handleChackBoxChange}  />
        }
        label="Confiance"
      />
               <br />
              {this.state.confiance !== "confiance" ? <p>{this.state.confiance}</p> :null}
              </Grid>
             
             
            </Grid>
          
            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.clientEdited}
        autoHideDuration={3000}
        onClose={this.handleCloseSnack}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={this.handleCloseSnack}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
         
       
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