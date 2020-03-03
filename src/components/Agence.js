import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'



import LoadingComponent from "../utils/loadingComponent";

import {connect} from 'react-redux';
import {getEtreprise , modifierAgence} from './../store/actions/entrepriseAction'

import SaveIcon from "@material-ui/icons/Save";
 class Agence extends Component {
    state = {
        nom :  "",
        adresse : "",
        telephone : "",
        email : ""
    }
    componentWillMount(){
        this.props.getEtreprise();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.entreprise !== undefined){
            
         this.setState({...nextProps.entreprise})
        }
    }
    modifier = () =>{
   
        const data = {...this.state}
        console.log(data);
       
        if(data.nom === undefined || !data.nom.trim().length > 0){
            alert("le champ Nom obligatoire")
        }else{
            
             this.props.modifierAgence(data);
        }
    }   
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    render() {
        return (
            <div style={{padding : 35}}>
                <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
            <Grid container >
                <h1>Agence Information</h1>
              <Grid item xs={12}>
              <h3 style={{margin : 0}}>Nom de l'agence</h3>
                <TextField placeholder="Nom *" value={this.state.nom}  name="nom" variant="outlined" onChange={this.handleChange} fullWidth margin="normal" />
                <h3 style={{margin : 0}}>Email de l'agence</h3>
                <TextField placeholder="Email" value={this.state.email} name="email" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <h3 style={{margin : 0}}>Adresse de l'agence</h3>
                <TextField placeholder="Adresse" value={this.state.adresse} name="adresse" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
                <h3 style={{margin : 0}}>Télephone de l'agence</h3>
                <TextField placeholder="Télephone" value={this.state.telephone} name="telephone" variant="outlined"  onChange={this.handleChange} fullWidth margin="normal" />
            
               <br />
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
          
         
            </div>
        )
    }
}
const mapActionToProps = dispatch =>{
    return {
        modifierAgence : (data)=>dispatch(modifierAgence(data)),
        getEtreprise :  ()=>dispatch(getEtreprise())
    }
}
const mapStateToProps = state =>{
    return {
        entreprise : state.entreprise.info,
        loading : state.entreprise.loading
    }
}

export default connect(mapStateToProps,mapActionToProps)(Agence);
