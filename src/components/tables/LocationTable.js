import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import ReactTable from "react-table";
import "react-table/react-table.css";

//Mui
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import { Dialog, Collapse, Grid, DialogContent } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { searchClient, addToCorbeille, undoDeleteClient } from "../../store/actions/clientAction";

//icons

import PrintIconf from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UndoIcon from '@material-ui/icons/Undo';

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import LoadingComponent from "../../utils/loadingComponent";

class LocationTable extends Component {
  state = {
   
    addToCorbeilleDialog: false,
    locationDeletedId: null,
    rowsSelected: [],
    selectedAll: false,
   
    
  };
  componentWillReceiveProps(nextProps) {
   
      this.setState({ loading : nextProps.loading});
    
  }
 
  handleSearch = e => {
    e.preventDefault();
    const data = { ...this.state };
    delete data.addToCorbeilleDialog;
    delete data.open;
    delete data.locationDeletedId;
    delete data.rowsSelected;
    delete data.selectedAll;
  
    
    this.props.searchLocation(data);
  };

  handleSearchChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog });
  };
  add_To_Corbeille = id => {
   
    this.setState({ locationDeletedId: id });
    //popup
    this.handleOpenCloseaddToCorbeilleDialog();
  };
  handeleCheckCheckboxRow = (e, id) => {
    const rowsSelected = [...this.state.rowsSelected];

    if (this.checkRowIsSelected(id)) {
      //unselect
      rowsSelected.splice(
        rowsSelected.findIndex(item => id == item),
        1
      );
    } else {
      //select
      rowsSelected.push(id);
    }
    this.setState({ rowsSelected });
  };
  checkRowIsSelected = id => {
    const rowsSelected = [...this.state.rowsSelected];
    return rowsSelected.filter(row => row == Number.parseInt(id)).length > 0;
  };

  handleSelectAllLocationChange = () => {
    let selectedAll = this.state.selectedAll ? false : true;
    const rowsSelected = [];
    if (selectedAll) {
      this.props.rows.map(item => {
        rowsSelected.push(item.id);
      });
    }
    this.setState({ selectedAll, rowsSelected });
  };

  handleSelectOneChange =  (locationSelected) =>{
    this.setState({
      locationSelected

    })
  }
 
  render() {
    const columns = [
     
      {
        Header: "Nom client",
        accessor: "client_nom",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      },
      {
        Header: "Prénom",
        accessor: "client_prenom",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      },
      {
        Header: "Nom de Voiture",
        accessor: "voiture_nom",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      },
      {
        Header: "Modéle",
        accessor: "modele",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      },
      {
        Header: "Date sortie",
        accessor: "date_sortie",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      },
      {
        Header: "Date Entrée",
        accessor: "date_entree",
        Cell: props => 
        (
            <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      }
      ,
      {
        Header: "Remise",
        accessor: "remise",
        Cell: props => 
        (
            <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      }
      ,
      {
        Header: "Prix Totale",
        accessor: "prix_totale",
        Cell: props => 
        (
            <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        )
      }
    ];

   if( this.props.type !== "choose-one" ){
columns.unshift(
  {
    Header: (
      <div
        style={{
          backgroundColor: "#E4E4E4",
          border: "1px solid rgba(0,0,0,0.45)"
        }}
      >
        <Checkbox
          key={"check-all-client-key"}
          id="check-all-client-id"
          style={{ padding: 3 }}
          checked={this.state.selectedAll}
          onChange={this.handleSelectAllLocationChange}
          color="primary"
        />
      </div>
    ),
    sortable: false,
    filterable: false,
    accessor: "id",
    width: 50,

    Cell: props => (
      <div className="cell">
        <Checkbox
          value={props.value}
          key={`key-checkbox-table-location-${props.value}`}
          id={`id-checkbox-table-location-${props.value}`}
          onChange={e => this.handeleCheckCheckboxRow(e, props.value)}
          checked={this.checkRowIsSelected(props.value)}
          style={{ padding: 3 }}
        />
      </div>
    )
  },

  {
    Header: "  ",
    accessor: "id",
    width: 100,
    sortable: false,
    filterable: false,
    Cell: props => {
      if (this.props.type === "corbeille") {
        return  <div className="cell"><IconButton
        size="small"
        onClick={() => this.props.undoDeleteClient(props.value)}
      >
        <UndoIcon className="black" fontSize="small"></UndoIcon>
      </IconButton></div> ;
      } else {
        return (
          <div className="cell">
          
            <IconButton
              size="small"
              onClick={() => this.add_To_Corbeille(props.value)}
            >
              <DeleteIcon className="red" fontSize="small"></DeleteIcon>
            </IconButton>
            <IconButton size="small">
              <Link to={`/location/modifier/${props.value}`}>
                {" "}
                <EditIcon className="black" fontSize="small"></EditIcon>
              </Link>
            </IconButton>
            <IconButton size="small">
              <Link to={`/location/print/${props.value}`}>
                {" "}
                <PrintIconf className="black" fontSize="small"></PrintIconf>
              </Link>
            </IconButton>
          </div>
        );
      }
    }
  }
)
   }
    return (
      <Fragment>
        <Dialog
          open={this.state.addToCorbeilleDialog}
          onClose={this.handleOpenCloseaddToCorbeilleDialog}
        >
          <h2>Suprimer</h2>
          <button
            onClick={() => {
              this.props.addToCorbeille(this.state.locationDeletedId);
              this.handleOpenCloseaddToCorbeilleDialog();
            }}
          >
            Delete
          </button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>
            Cancel
          </button>
        </Dialog>

        <div className="table-container">
          {/*
            recherche
            */}
            {this.props.type!== "choose-one" ?  <Collapse in={this.state.rowsSelected.length > 0}>
            <IconButton>
              <PrintIconf className="black" fontSize="large"></PrintIconf>
            </IconButton>
            <IconButton>
              <DeleteIcon className="red" fontSize="large"></DeleteIcon>
            </IconButton>
          </Collapse> :null}
        
          <LoadingComponent loading={this.state.loading !== undefined ? this.state.loading : false} />
          <ReactTable
            className="table"
            data={this.props.rows}
            columns={columns}
            defaultPageSize={this.props.type=== "choose-one" ? 5 :20}
          />
        </div>
      </Fragment>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    searchClient: data => dispatch(searchClient(data)),
    addToCorbeille: id => dispatch(addToCorbeille(id)),
    undoDeleteClient :  id=>dispatch(undoDeleteClient(id))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.client.loading
  };
};
export default connect(mapStateToProps, mapActionToProps)(LocationTable);
