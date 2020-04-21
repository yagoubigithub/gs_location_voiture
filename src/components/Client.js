import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";

import { Tab, Tabs } from "react-tabs-css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import LoadingComponent from "../utils/loadingComponent";
import {
  getAllClient,
  searchClient,
  addToCorbeille,
  undoDeleteClient
} from "../store/actions/clientAction";

import Dialog from "@material-ui/core/Dialog";

//icons

import ClientTable from "./tables/ClientTable";
import AjouterClient from "./AjouterClient";
import ModifierClient from "./ModifierClient";

class Client extends Component {
  state = {
    clients: [],
    clientCorebeille: [],
    clientConfiance: [],
    rowsSelected: [],
    delete_button_text: "Suprimer",
    clientPasConfiance: [],
    nom: "",
    prenom: "",
    numero_cart: "",
    addToCorbeilleDialog: false,
  };

  componentWillMount() {
    this.props.getAllClient();
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.clients !== undefined) {
      const clients = [];
      const clientCorebeille = [];
      const clientConfiance = [];
      const clientPasConfiance = [];
      nexProps.clients.map((client) => {
        if (client.status === "undo") {
          clients.push(client);
        }
        if (client.status === "corbeille") {
          clientCorebeille.push(client);
        }
        if (client.status !== "corbeille" && client.confiance === "") {
          clientConfiance.push(client);
        }
        if (client.status !== "corbeille" && client.confiance !== "") {
          clientPasConfiance.push(client);
        }
      });

      this.setState({
        clients,
        clientCorebeille,
        clientConfiance,
        clientPasConfiance,
        loading: nexProps.loading,
      });
    }
  }
  getData = (rowsSelected) => {
    this.setState({ rowsSelected });
  };

  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog });
  };
  Supprimer = () => {
    if (this.state.rowsSelected.length === 0) {
      alert("Selectionnner des clients");
    } else {
      if (this.state.tab !== "clientCorebeille") {
        this.handleOpenCloseaddToCorbeilleDialog();
      }
      if (this.state.tab === "clientCorebeille") {
        this.state.rowsSelected.map((client) => {
          this.props.undoDeleteClient(client);
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


  handleChangeTab = (tab) => {
    switch (tab) {
      case "clients":
        this.setState({
          delete_button_text: "Supprimer",
          rowsSelected: [],
          
          tab: "clients",
        });

        break;

      case "clientCorebeille":
        this.setState({
          delete_button_text: "Annuler Suppression",
          rowsSelected: [],
          tab: "clientCorebeille",
        });

        break;

      

      default:
        this.setState({
          delete_button_text: "Supprimer",
         
          rowsSelected: [],
          tab: "clients",
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
            this.state.loading !== undefined ? this.state.loading : false
          }
        />

        <div className="sous-nav-container">
          <NavLink onClick={this.props.getAllClient} to="/client">
            <button className="btn btn-nav">Actualisé</button>
          </NavLink>

          <NavLink to="/client/ajouter">
            <button className="btn btn-nav">Ajouter</button>
          </NavLink>

          <button className="btn btn-nav" onClick={this.Supprimer}>
            {this.state.delete_button_text}
          </button>
        </div>

        <Route path="/client/modifier/:id" component={ModifierClient} />

        <Route path="/client/ajouter" component={AjouterClient} />

        <Tabs>
          <Tab
            index={0}
            onClick={() => this.handleChangeTab("clients")}
            title="Tous les clients"
          >
            <ClientTable
              checkBoxColumn
              sendData={this.getData}
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              rows={this.state.clients}
            />
          </Tab>

          <Tab
            index={1}
            title="Confiance"
            onClick={() => this.handleChangeTab("clientConfiance")}
          >
            <ClientTable
              checkBoxColumn
              sendData={this.getData}
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              rows={this.state.clientConfiance}
            />
          </Tab>
          <Tab
            index={2}
            title="pas Confiance"
            onClick={() => this.handleChangeTab("clientPasConfiance")}
          >
            <ClientTable
              checkBoxColumn
              sendData={this.getData}
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              rows={this.state.clientPasConfiance}
            />
          </Tab>
          <Tab
            index={3}
            title="Corbeille"
            onClick={() => this.handleChangeTab("clientCorebeille")}
          >
            <ClientTable
              checkBoxColumn
              sendData={this.getData}
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              rows={this.state.clientCorebeille}
              type="corbeille"
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth,
    clients: state.client.clients,
    loading: state.client.loading,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    getAllClient: () => dispatch(getAllClient()),
    searchClient: (data) => dispatch(searchClient(data)),
    addToCorbeille: (id) => dispatch(addToCorbeille(id)),
    undoDeleteClient :  id=>dispatch(undoDeleteClient(id)),
  };
};
export default connect(mapStateToProps, mapActionToProps)(Client);
