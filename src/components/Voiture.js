import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Tab, Tabs } from "react-tabs-css";

import VoitureTable from "./tables/VoitureTable";

import { connect } from "react-redux";

import LoadingComponent from "../utils/loadingComponent";
import {
  getAllVoiture,
  searchVoiture,
  undoDeleteVoiture,
  addToCorbeille,
  setVoitureEnPanne,
} from "../store/actions/voitureAction";
import SousNavVoiture from "./SousNavVoiture";
import AjouterVoiture from "./AjouterVoiture";

//icons
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ModifierVoiture from "./ModifierVoiture";
import { Snackbar, IconButton, Dialog } from "@material-ui/core";

class Voiture extends Component {
  state = {
    nom: "",
    matricule: "",
    modele: "",
    marque: "",
    voitures: [],
    voitureCorebeille: [],
    voitureDisponible: [],
    voitureEnPane: [],
    voitureLocation: [],
    voitureAlarte: [],
    rowsSelected: [],
    openSnack: false,
    error: "",
    addToCorbeilleDialog: false,
    delete_button_text: "Supprimer",
    tab: "voitures",
    enpane_button_text  :  "En Panne"
  };

  componentDidMount() {
    this.props.getAllVoiture();
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.voitures !== undefined) {
      const voitures = [];
      const voitureDisponible = [];
      const voitureEnPane = [];
      const voitureLocation = [];
      const voitureAlarte = [];
      const voitureCorebeille = [];

      nexProps.voitures.map((voiture) => {
        if (voiture.status === "undo") {
          voitures.push(voiture);
        }
        if (
          voiture.disponibilite === "disponible" &&
          voiture.status === "undo"
        ) {
          voitureDisponible.push(voiture);
        }
        if (voiture.disponibilite === "enPane" && voiture.status === "undo") {
          voitureEnPane.push(voiture);
        }
        if (voiture.disponibilite === "loué" && voiture.status === "undo") {
          voitureLocation.push(voiture);
        }
        if (voiture.status === "corbeille") {
          voitureCorebeille.push(voiture);
        }
        const datePlusDays = new Date();
        datePlusDays.setDate(datePlusDays.getDate() + 15);

        if (
          voiture.status !== "corbeille" &&
          new Date(voiture.assurance_fin).getTime() < datePlusDays.getTime()
        ) {
          voitureAlarte.push(voiture);
        }
      });

      if (voitureAlarte.length > 0) {
        this.setState({ openSnack: true, error: "vérifier l'assurance" });
      }
      this.setState({
        voitures,
        voitureCorebeille,
        voitureAlarte,
        voitureDisponible,
        voitureEnPane,
        voitureLocation,
      });
    }
  }

  handleCloseSnack = () => {
    this.setState({ openSnack: !this.state.openSnack });
  };

  getData = (rowsSelected) => {
    this.setState({ rowsSelected });
  };

  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog });
  };

  Supprimer = () => {
    if (this.state.rowsSelected.length === 0) {
      alert("Selectionnner des voitures");
    } else {
      if (this.state.tab !== "voitureCorebeille") {
        this.handleOpenCloseaddToCorbeilleDialog();
      }
      if (this.state.tab === "voitureCorebeille") {
        this.state.rowsSelected.map((voiture) => {
          this.props.undoDeleteVoiture(voiture);
        });
        this.setState({ rowsSelected: [] });
      }
    }
  };
  addToCorbeille = () => {
    const rowsSelected = [...this.state.rowsSelected];
    rowsSelected.map((voiture) => {
      this.props.addToCorbeille(voiture);
    });
    this.setState({ rowsSelected: [] });
  };

  enPanne = () => {
    if (this.state.rowsSelected.length === 0) {
      alert("Selectrionnner des voiture");
    } else {
      this.state.rowsSelected.map((voiture) => {
        this.props.setVoitureEnPanne(voiture);
      });
      this.setState({ rowsSelected: [] });
    }
  };
  handleChangeTab = (tab) => {
    switch (tab) {
      case "voitures":
        this.setState({
          delete_button_text: "Supprimer",
          rowsSelected: [],
          enpane_button_text: "mettre en panne",
          tab: "voitures",
        });

        break;

      case "voitureCorebeille":
        this.setState({
          delete_button_text: "Annuler Suppression",
          rowsSelected: [],
          tab: "voitureCorebeille",
        });

        break;

        case "voitureEnPane":
          this.setState({
            enpane_button_text: "mettre disponible",
            rowsSelected: [],
            tab: "voitureEnPane",
          });
  
          break;

      default:
        this.setState({
          delete_button_text: "Supprimer",
          enpane_button_text: "mettre en panne",
          rowsSelected: [],
          tab: "voitures",
        });
        break;
    }
  };
  render() {
    if (this.props.auth.user === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Dialog
          open={this.state.addToCorbeilleDialog}
          onClose={this.handleOpenCloseaddToCorbeilleDialog}
        >
          <h2>Deleted</h2>
          <button
            onClick={() => {
              this.addToCorbeille();
              this.handleOpenCloseaddToCorbeilleDialog();
            }}
          >
            Delete
          </button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>
            Cancel
          </button>
        </Dialog>
        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <div className="sous-nav-container">
          <NavLink onClick={this.props.getAllVoiture} to="/voiture">
            <button className="btn btn-nav">Actualisé</button>
          </NavLink>

          <NavLink to="/voiture/ajouter">
            <button className="btn btn-nav">Ajouter</button>
          </NavLink>

          <button className="btn btn-nav" onClick={this.Supprimer}>
            {this.state.delete_button_text}
          </button>
          <button className="btn btn-nav" onClick={this.enPanne}>
            {this.state.enpane_button_text}
          </button>
        </div>
        

        <Route path="/voiture/modifier/:id" component={ModifierVoiture} />

        <Tabs>
          <Tab
            index={0}
            title="Tous les voitures"
            onClick={() => this.handleChangeTab("voitures")}
          >
            <VoitureTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.voitures}
            />
          </Tab>

          <Tab
            index={1}
            title="Voitures disponible"
            onClick={() => this.handleChangeTab("voitureDisponible")}
          >
            <VoitureTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.voitureDisponible}
            />
          </Tab>
          <Tab
            index={2}
            title="Voitures Loué"
            onClick={() => this.handleChangeTab("voitureLocation")}
          >
            <VoitureTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.voitureLocation}
            />
          </Tab>
          <Tab
            index={3}
            title="Liste noire"
            onClick={() => this.handleChangeTab("voitureAlarte")}
          >
          <h2>L'assurance automobile a expiré</h2>
            <VoitureTable
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.voitureAlarte}
            />
          </Tab>
          <Tab
            index={4}
            title="Voitures En Panne"
            onClick={() => this.handleChangeTab("voitureEnPane")}
          >
            <VoitureTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.voitureEnPane}
            />
          </Tab>
          <Tab
            index={5}
            title="Corbeille"
            onClick={() => this.handleChangeTab("voitureCorebeille")}
          >
            <VoitureTable
              checkBoxColumn
              IconsColumn
              sendData={this.getData}
              rowsSelected={this.state.rowsSelected}
              rows={this.state.voitureCorebeille}
              type={"corbeille"}
            />
          </Tab>
        </Tabs>

        <Route path="/voiture/ajouter" component={AjouterVoiture} />


{this.state.openSnack ?
<div className="alert">

{this.state.error}
</div> :null}
      
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth,
    voitures: state.voiture.voitures,
    loading: state.voiture.loading,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    getAllVoiture: () => dispatch(getAllVoiture()),
    searchVoiture: (data) => dispatch(searchVoiture(data)),
    addToCorbeille: (id) => dispatch(addToCorbeille(id)),
    undoDeleteVoiture: (id) => dispatch(undoDeleteVoiture(id)),
    setVoitureEnPanne: (id) => dispatch(setVoitureEnPanne(id)),
  };
};
export default connect(mapStateToProps, mapActionToProps)(Voiture);
