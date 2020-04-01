import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";

import { Tab, Tabs } from "react-tabs-css";
import { connect } from "react-redux";

import LoadingComponent from "../utils/loadingComponent";
import {
  getAllLocation,
  searchLocation
} from "../store/actions/locationAction";
import { getEtreprise } from "./../store/actions/entrepriseAction";

//icons
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';

import ModifierClient from "./ModifierClient";
import SousNavLocation from "./SousNavLocation";
import LocationTable from "./tables/LocationTable";
import AjouterLocation from "./AjouterLocation";

import { Snackbar, IconButton } from '@material-ui/core';

class Location extends Component {
  state = {
    locations: [],
    locationCorebeille: [],
    locationAlarte: [],
    locationActuale: [],
    client_nom: "",
    matricule: "",
    numero_cart: "",
    voiture_nom: "",
    error:  "",
    openSnack : false
  };

  componentWillMount() {
    this.props.getAllLocation();
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.locations !== undefined) {
      const locations = [];
      const locationCorebeille = [];
      const locationAlarte = [];
      const locationActuale = [];
      nexProps.locations.map(location => {
        if (location.status === "undo") {
          locations.push(location);
        }
        if (location.status === "corbeille") {
          locationCorebeille.push(location);
        }
        const date_current = new Date();
        const date_entree = new Date(location.date_entree);
        const date_sortie = new Date(location.date_sortie);
        if (
          location.voiture_disponibilite === "loué" &&
          date_current.getTime() > date_entree.getTime()
        ) {
          locationAlarte.push(location);
        }

        if (
          location.voiture_disponibilite === "loué" &&
          date_current.getTime() > date_sortie.getTime() &&
            date_current.getTime() < date_entree.getTime()
        ) {
          locationActuale.push(location);
        }
      });
      if(locationAlarte.length > 0 ){
        this.setState({openSnack : true, error : "vérifier Les Alertes de location"});
      }

      this.setState({
        locations,
        locationAlarte,
        locationActuale,
        locationCorebeille,
        loading: nexProps.loading
      });
    }
    if (nexProps.entreprise !== undefined) {
      this.setState({ entreprise: nexProps.entreprise });
    }
  }

 
 
  handleCloseSnack = () =>{
    this.setState({openSnack : !this.state.openSnack})
  }
  render() {
    if (this.props.auth.user === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <LoadingComponent
          loading={
            this.state.loading !== undefined ? this.state.loading : false
          }
        />
        <SousNavLocation />
        <Route path="/location/modifier/:id" component={ModifierClient} />

     
        <Route path="/location/ajouter" component={AjouterLocation} />

        <Tabs>
          <Tab index={0} title="Les locations">
            <LocationTable rows={this.state.locations} />
          </Tab>

          <Tab index={1} title="Les Alertes">
            <LocationTable rows={this.state.locationAlarte} />
          </Tab>
          <Tab index={2} title="les locations actuale">
            <LocationTable rows={this.state.locationActuale} />
          </Tab>
        </Tabs>
        
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSnack}
        autoHideDuration={6000}
        onClose={this.handleCloseSnack}
        message={this.state.error}
        color="error"
        action={
          <React.Fragment>
           
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnack}>
             <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.auth,
    locations: state.location.locations,
    loading: state.location.loading,
    location: state.location.location,
    entreprise: state.entreprise.info
  };
};

const mapActionToProps = dispatch => {
  return {
    getAllLocation: () => dispatch(getAllLocation()),
    searchLocation: data => dispatch(searchLocation(data)),
    getEtreprise: () => dispatch(getEtreprise())
  };
};
export default connect(mapStateToProps, mapActionToProps)(Location);
