import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import UploadImage from "yagoubi-upload-images";

//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import { connect } from "react-redux";

import { ajouterVoiture ,removeVoitureCreated} from "../store/actions/voitureAction";

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
    prix: 0,
   
    image : ""
  };
  constructor (props){
    super(props);
    this.UploadImagesInput = React.createRef()

  }
  ajouter = () => {
    const data = { ...this.state };
    delete data.open;
    if (data.nom === undefined || !data.nom.trim().length > 0) {
      this.setState({error : "le champ Nom obligatoire"})
    } else {
      this.props.ajouterVoiture(data);
    }
  };
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
     
      image : ""
     })
     this.UploadImagesInput.current.removeAllImages();
    }
  }
  handleChange = e => {
    if(e.target.name === "prix"){
      try {
        const v= parseInt(e.target.value);

        this.setState({prix : v})
        
      } catch (error) {
        
      }
    }else{
      this.setState({
        [e.target.name]: e.target.value
      });
    }
   
  };
  handleChangeImage = files => {

 if(files.length === 0)   this.setState({image : ""}, ()=>{
  console.log(this.state.image)
})
else
    this.setState({image : files[0].path}, ()=>{
      console.log(this.state.image)
    })
  };
  render() {
    return (
      <Dialog fullScreen open={this.state.open}>
        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <AppBar className="bg-dark">
          <Toolbar style={{display : "flax", justifyContent : "space-between"}}>
            
            <h2 style={{ textAlign: "center" }}>Ajouter Voiture</h2>
            <Link to="/voiture/">
              <IconButton onClick={this.handleClose} style={{color : "white"}}>
                <CloseIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 40, padding: 15 }}></div>

        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <span className="red">{this.state.error}</span>
            <TextField
              placeholder="Nom *"
              value={this.state.nom}
              name="nom"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  placeholder="Modéle"
                  value={this.state.modele}
                  name="modele"
                  variant="outlined"
                  onChange={this.handleChange}
                  fullWidth
                  margin="normal"
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
                  margin="normal"
                />
              </Grid>
            </Grid>

<Grid container>
  <Grid item xs={6}>
  <TextField
              placeholder="L'année"
              value={this.state.annee}
              name="annee"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
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
              margin="normal"
            />
  </Grid>
</Grid>
            
            
            <TextField
              placeholder="Matricule"
              value={this.state.matricule}
              name="matricule"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <h3>Prix par jour</h3>
            <TextField
              placeholder="Prix par jour"
              value={this.state.prix}
              name="prix"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ min: "0", step: "1" }}
            />

            <UploadImage
              placeholder="Images"
              multiple={false}
              onChange={this.handleChangeImage}
              ref={this.UploadImagesInput}
            />
         
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
    removeVoitureCreated : () =>dispatch(removeVoitureCreated())
  };
};
const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voitureCreated: state.voiture.voitureCreated
  };
};
export default connect(mapStateToProps, mapActionToProps)(AjouterVoiture);
