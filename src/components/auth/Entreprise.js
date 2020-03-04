import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

//MUI
import Dialog from '@material-ui/core/Dialog'
import UploadImage from 'yagoubi-upload-images';

//redux
import {connect} from "react-redux";
import {ajouterntreprise,getEtreprise} from '../../store/actions/entrepriseAction'


import LoadingComponent from "../../utils/loadingComponent";
import { Grid, TextField, Button } from '@material-ui/core';

 class Entreprise extends Component {
    state = {
        open : true,
        nom : "",
        telephone :  "",
        adresse :  "",
        email : "",
        password :  "",
        e_agence : "",
        e_telephone : "",
        e_email : "",
        e_adresse : ""

    }
    componentWillMount(){
        this.props.getEtreprise();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.entreprise !== undefined){
            
            const { history } = this.props;
            if (history) history.push('/connexion');
        }
    }
    handleChange=(e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    ajouter = ()=>{
        const data = {...this.state};
        if(data.nom_agence === undefined || data.nom_agence.trim().length <= 0){
           this.setState({e_agence :  "Nom de l'agence obligatoire"})
            return;
        }else{
            this.setState({e_agence :  ""})
        }
        if(data.telephone === undefined || data.telephone.trim().length <= 0){
            this.setState({e_telephone :  "Numero Télephone obligatoire"})
            return;
        }else{
            this.setState({e_telephone :  ""})
        }
        if(data.email === undefined || data.email.trim().length <= 0){
            this.setState({e_email :  "Email obligatoire"})
            return;
        }else{
            this.setState({e_email :  ""})
        }
        if(data.adresse === undefined || data.adresse.trim().length <= 0){
            this.setState({e_adresse :  "Adresse obligatoire"})
            return;
        }else{
            this.setState({e_adresse :  ""})
        }
        this.props.ajouterntreprise({entreprise : {nom : data.nom_agence, telephone : data.telephone,email : data.email,adresse : data.adresse }
        ,user  : {username : data.nom, password : data.password}})
       

      
    }
    
    render() {
        return (
            <Dialog fullScreen open={this.state.open}>

              
            <Grid container >
                <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <h1>Agence Information</h1>
                <TextField
                 placeholder="Nom de l'agence *"
                 error={this.state.e_agence}
                  value={this.state.nom_agence}  name="nom_agence" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Télephone *"
                 error={this.state.e_telephone}
                 value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Email * "
                 error={this.state.e_email} value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Adresse *"  error={this.state.e_adresse} value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Nom de l'admin "  value={this.state.nom} name="nom" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <TextField placeholder="Mot de passe  " value={this.state.password} name="password" variant="outlined"  onChange={this.handleChange} type="password" fullWidth margin="normal" />
                
               
                <br />
                <Button variant="contained" color="primary" size="large" onClick={this.ajouter} >Enregistrer</Button>
                <br />
              </Grid>
             
             
            </Grid>
          
                <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
            </Dialog>
        )
    }
}
const mapActionToProps = dispatch =>{
    return {
        ajouterntreprise  : (data) => dispatch(ajouterntreprise(data)),
        getEtreprise :  ()=>dispatch(getEtreprise())
    }
}
const mapStateToProps = state =>{
    return {
        entreprise : state.entreprise.info,
        loading : state.auth.loading
    }
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(Entreprise));













