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
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

//redux

import { connect } from "react-redux";

import {
  modifierVoiture,
  getVoiture,
  getDirename,
  removeVoitureEdited,
  getImages
} from "../store/actions/voitureAction";

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
    assurance_debut :  new Date().toISOString().split('T')[0],
    assurance_fin : new Date().toISOString().split('T')[0],
    images: []
  };
  constructor(props) {
    super(props);
    this.UploadImagesInput = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getVoiture(id);
    this.props.getImages(id);
  }
  modifier = () => {
    const data = { ...this.state };
    const id = this.props.match.params.id;
    delete data.open;
    console.log("modifier", data)
    if (data.nom === undefined || !data.nom.trim().length > 0 ) {
      alert("le champ Nom obligatoire");
    } else {
      
      this.props.modifierVoiture({ ...data, id });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.voitureEdited) {
      // voiture edited alert success
      this.setState({
        voitureEdited: nextProps.voitureEdited,
        voiture: nextProps.voiture
      });
    }

    if (nextProps.voiture) {
      this.setState({ ...nextProps.voiture });
    }

    if (nextProps.images) {
      
      this.setState({ images: nextProps.images.map(image=>image.image) });

     
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeImage = files => {
    const images = [];

    console.log(files);
    files.map(file => {
      images.push({
        imagePath : file.path,
        imageName :  file.name
      });
    });
    this.setState({ images });
  };

  handleCheckBoxChange = () => {
    const disponibilite = this.state.disponibilite;
    if (disponibilite === "enPane") {
      this.setState({ disponibilite: "disponible" });
    } else {
      this.setState({ disponibilite: "enPane" });
    }
  };
  ajouterImage = () =>{
    const file = this.fileInput.files[0];
  
    if(file){
       this.toBase64(file).then((image64)=>{
        const images = [...this.state.images]
        images.push(image64)
        this.setState({images})
        this.fileInput.value = ""
      })
    }
   
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
removeImage = index =>{
  const images = [...this.state.images];
  images.splice(index , 1);
  this.setState({images})
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
          <Toolbar style={{ display: "flax", justifyContent: "space-between" }}>
            <h4 style={{ textAlign: "center" }}>Modifier Voiture</h4>
            <Link to="/voiture/">
              <IconButton
                onClick={this.props.removeVoitureEdited}
                style={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 40, padding: 15 }}></div>

        <Grid container spacing={2} style={{padding : 15}}>
          
          <Grid item xs={12}>
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

</Grid>
            <Grid item xs={4}>
              <TextField
                placeholder="Nom *"
                value={this.state.nom}
                name="nom"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                placeholder="Matricule"
                value={this.state.matricule}
                name="matricule"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <h2 style={{ margin: 0 }}>Assurance : </h2>
            </Grid>
            <Grid item xs={6}>
              <h3 style={{ margin: 0 }}>À partir de</h3>

              <TextField
                placeholder="Date début"
                value={this.state.assurance_debut}
                name="assurance_debut"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                margin="none"
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <h3 style={{ margin: 0 }}>À </h3>
              <TextField
                placeholder="Date fin"
                value={this.state.assurance_fin}
                name="assurance_fin"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                margin="none"
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <h3>Prix par jour</h3>

              <TextField
                placeholder="Prix par jour"
                value={this.state.prix}
                name="prix"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                margin="none"
                type="number"
                inputProps={{ min: "0", step: "1" }}
              />
            </Grid>

            <Grid item xs={6}>
            <input type={"file"}  accept="image/*" ref={input => (this.fileInput = input)} multiple={false} />
        <button onClick={this.ajouterImage} >Ajouter image</button>
        <div className="image-container">
          {this.state.images.map((image,index)=>{
            return (<div className="image">
            <IconButton onClick={()=>this.removeImage(index)} >
              <CloseIcon></CloseIcon>
            </IconButton>
            <img style={{height : 100, width : 100}}  key={`image-${index}`} src={image} /></div>)
          })}
        </div>
            </Grid>

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
     
      </Dialog>
    );
  }
}
const mapActionToProps = dispatch => {
  return {
    modifierVoiture: data => dispatch(modifierVoiture(data)),
    getVoiture: id => dispatch(getVoiture(id)),
    getImages: id => dispatch(getImages(id)),
    getDirename: () => dispatch(getDirename()),
    removeVoitureEdited: () => dispatch(removeVoitureEdited())
  };
};
const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voiture: state.voiture.voiture,
    direname: state.voiture.direname,
    images: state.voiture.images
  };
};
export default connect(mapStateToProps, mapActionToProps)(ModifierVoiture);
