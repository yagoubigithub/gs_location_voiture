import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";


//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import {connect} from 'react-redux';

import {ajouterClient} from '../store/actions/clientAction'

import LoadingComponent from "../utils/loadingComponent";




//utils

import {getCurrentDateTime} from '../utils/methods'

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
  handleDateNaissanceChange = (a)  =>{
this.setState({date_naissance : getCurrentDateTime(new Date(a._d).getTime()).split('T')[0]})
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

        <span className="red">{this.state.error} abcd efgh</span>
            <Grid container  spacing={1} style={{padding : 25}}>
               <Grid  item xs={6}>
               <h3 style={{margin : 0}}>Nom * </h3>
                  <TextField placeholder="Nom *" value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
               </Grid>
               <Grid item xs={6}>
               <h3 style={{margin : 0}}>Prénom * </h3>
                   <TextField placeholder="Prénom" value={this.state.prenom} name="prenom" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
               
               </Grid>
              <Grid item xs={6}>
              
              <h3 style={{margin : 0}}>Date de naissance</h3>
              
  
                <DatePicker
        disableFuture
        openTo="year"
        format="DD-MM-YYYY"
        label="Date de naissance"
        views={["year", "month", "date"]}
        fullWidth
        inputVariant="outlined"
        value={this.state.date_naissance === "" ?  getCurrentDateTime(new Date().getTime()).split('T')[0] : 
        getCurrentDateTime(new Date(this.state.date_naissance).getTime()).split('T')[0]
        }
        
        onChange={this.handleDateNaissanceChange}
      />
      </Grid>
      <Grid item xs={6}>
      <h3 style={{margin : 0}}>P.CN°</h3>        
              <TextField placeholder="P.CN°" value={this.state.numero_cart} name="numero_cart" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
              </Grid>
      <Grid item xs={6}> 
      <h3 style={{margin : 0}}>Télephone</h3>
                <TextField placeholder="Télephone" value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
      <Grid item xs={6}> 
      <h3 style={{margin : 0}}>Adresse</h3>
                <TextField placeholder="Adresse" value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
      <Grid item xs={6}> 
      <h3 style={{margin : 0}}>Email</h3>
                <TextField placeholder="Email" value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                </Grid>
      <Grid item xs={12}> 
              
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