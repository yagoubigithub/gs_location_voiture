import React, { Component } from "react";

import { Link } from "react-router-dom";

//Mui
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import Button from "@material-ui/core/Button";
import UploadImage from "yagoubi-upload-images";

//icons
import CloseIcon from "@material-ui/icons/Close";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import { connect } from "react-redux";

import { modifierVoiture, getVoiture } from "../store/actions/voitureAction";

import LoadingComponent from "../utils/loadingComponent";

class ModifierVoiture extends Component {
  state = {
    open: true,
    nom: "",
    modele: "",
    marque: "",
    annee: "",
    coleur: "",
    matricule: "",
    images: []
  };

  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.getVoiture(id);
  }
  modifier = () => {
    const data = { ...this.state };
    const id = this.props.match.params.id;
    delete data.open;
    if (data.nom === undefined || !data.nom.trim().length > 0) {
      alert("le champ Nom obligatoire");
    } else {
      this.props.modifierVoiture({ ...data, id });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.voitureEdited) {
      // voiture edited alert success
      this.setState({ voitureEdited: nextProps.voitureEdited });
    }

    if (nextProps.voiture) {
      this.setState({ ...nextProps.voiture });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeImage = files => {
    const images = [];
    files.map(file => {
      images.push(file.path);
    });
    this.setState({ images });
  };
  handleCloseSnack = () => {
    this.setState({ voitureEdited: !this.state.voitureEdited });
  };
  handleCheckBoxChange = () =>{
    const disponibilite = this.state.disponibilite;
    if(disponibilite === "enPane"){
      this.setState({disponibilite : "disponible"})
    
  }else{
    this.setState({disponibilite : "enPane"})
  }
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
       <Toolbar style={{display : "flax", justifyContent : "space-between"}}>
           
            <h4 style={{ textAlign: "center" }}>Modifier Voiture</h4>
            <Link to="/voiture/">
              <IconButton onClick={this.handleClose} style={{color : "white"}}>
                <CloseIcon />
              </IconButton>
            </Link>

            
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 40, padding: 15 }}></div>

        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.disponibilite === "enPane"}
                  onChange={this.handleCheckBoxChange}
                  value={this.state.disponibilite}
                />
              }
              label=" En panne"
            />
            <TextField
              placeholder="Nom *"
              value={this.state.nom}
              name="nom"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
<Grid container>
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

         
          
            <TextField
              placeholder="L'année"
              value={this.state.annee}
              name="annee"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              placeholder="Coleur"
              value={this.state.coleur}
              name="coleur"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              placeholder="Matricule"
              value={this.state.matricule}
              name="matricule"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />

            <UploadImage
              placeholder="Images"
              multiple
              onChange={this.handleChangeImage}
            />
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

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.voitureEdited}
          autoHideDuration={4000}
          onClose={this.handleCloseSnack}
          message="Note archived"
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleCloseSnack}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleCloseSnack}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Dialog>
    );
  }
}
const mapActionToProps = dispatch => {
  return {
    modifierVoiture: data => dispatch(modifierVoiture(data)),
    getVoiture: id => dispatch(getVoiture(id))
  };
};
const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voitureEdited: state.voiture.voitureEdited,
    voiture: state.voiture.voiture
  };
};
export default connect(mapStateToProps, mapActionToProps)(ModifierVoiture);
