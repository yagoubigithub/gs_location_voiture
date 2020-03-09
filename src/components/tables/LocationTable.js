import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import ReactTable from "react-table";
import "react-table/react-table.css";

//Mui
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import { Dialog, Collapse, Grid, DialogContent, Button } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { searchClient,  undoDeleteClient } from "../../store/actions/clientAction";
import { addToCorbeille} from "../../store/actions/locationAction";
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
    printDialog : false,
   
    
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
  handleOpenCloseprintDialog = () =>{
    this.setState({printDialog : !this.state.printDialog})
  }
 
  openPrintDialog = (obj)=>{
    this.setState({facture_id : obj.facture_id, location_id :  obj.id})
    this.handleOpenCloseprintDialog();
   
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
            {props.value !== "undefined" ? props.value.replace('T', " ") : ""}
          </div>
        )
      },
      {
        Header: "Date Entrée",
        accessor: "date_entree",
        Cell: props => 
        (
            <div className="cell">
            {props.value !== "undefined" ? props.value.replace('T', " ") : ""}
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
          
           
            
            <IconButton size="small" onClick={()=>this.openPrintDialog(props.original)}>
            
               
                <PrintIconf className="black" fontSize="small"></PrintIconf>
            
            </IconButton>
            <IconButton size="small" onClick={()=>this.add_To_Corbeille(props.original)}>
            
               
            <DeleteIcon className="red" fontSize="small"></DeleteIcon>
        
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

<Dialog open={this.state.printDialog}   onClose={this.handleOpenCloseprintDialog}>
<div style={{padding : 15}}>
<h3>Imprimer</h3>
<Link to={`/facture/${this.state.facture_id}/location`}><Button style={{padding : 15 ,margin : 5}} color="primary" variant="contained">facture</Button></Link>
<Link to={`/bonlivraison/${this.state.location_id}`}><Button style={{padding : 15 ,margin : 5}} color="primary" variant="contained" >Bon de livraison</Button></Link>

<Link to={`/contrat/${this.state.location_id}`}><Button style={{padding : 15 ,margin : 5}} color="primary" variant="contained" >Contrat</Button></Link>
</div>

</Dialog>

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
   addToCorbeille : id=>  dispatch(addToCorbeille(id)),
    undoDeleteClient :  id=>dispatch(undoDeleteClient(id))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.client.loading
  };
};
export default connect(mapStateToProps, mapActionToProps)(LocationTable);
