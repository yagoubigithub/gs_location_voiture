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

import UndoIcon from '@material-ui/icons/Undo';
import SearchIcon from '@material-ui/icons/Search';

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
    if(rowsSelected.length === 0) this.setState({selectedAll : false})
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
        ),
        width : 120,
        filterMethod: (filter, row) =>
        {
          const regx =  `.*${filter.value}.*`;
          return row[filter.id].match(regx)
        },
          Filter: ({ filter, onChange }) =>
          <div className="searchtable-container">
          <label htmlFor="date-input-nom">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-nom"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      },
      {
        Header: "Prénom",
        accessor: "client_prenom",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        width : 120,
        filterMethod: (filter, row) =>
        {
          const regx =  `.*${filter.value}.*`;
          return row[filter.id].match(regx)
        },
          Filter: ({ filter, onChange }) =>
          <div className="searchtable-container">
          <label htmlFor="date-input-prenom">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-prenom"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      },
      {
        Header: "Nom de Voiture",
        accessor: "voiture_nom",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        filterMethod: (filter, row) =>
        {
          const regx =  `.*${filter.value}.*`;
          return row[filter.id].match(regx)
        },
        
        
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
          , width : 120,
          Filter: ({ filter, onChange }) =>
          <div className="searchtable-container">
          <label htmlFor="date-input-nom-voiture">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-nom-voiture"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      },
      {
        Header: "Modéle",
        accessor: "modele",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        filterMethod: (filter, row) =>
        {
          const regx =  `.*${filter.value}.*`;
          return row[filter.id].match(regx)
        },
        width:120,
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-modele">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="text"
          id="date-input-modele"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : ""}/>
        </div>
      },
      {
        Header: "Date sortie",
        accessor: "date_sortie",
        Cell: props => (
          <div className="cell">
            {props.value !== "undefined" ? props.value.replace('T', " ") : ""}
          </div>
        ),
        width: 185,
        filterMethod: (filter, row) =>
        {
          const regx =  `${filter.value}.*`;
          return row[filter.id].match(regx)
        },
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-date_sortie">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="date"
          id="date-input-date_sortie"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : new Date().toDateString()}/>
        </div>
      },
      {
        Header: "Date Entrée",
        accessor: "date_entree",
        Cell: props => 
        (
            <div className="cell">
            {props.value !== "undefined" ? props.value.replace('T', " ") : ""}
          </div>
        ),
        width: 185,
        filterMethod: (filter, row) =>
        {
          const regx =  `${filter.value}.*`;
          return row[filter.id].match(regx)
        },
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-date_entree">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="date"
          id="date-input-date_entree"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : new Date().toDateString()}/>
        </div>
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
        ),
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-remise">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="text"
          id="date-input-remise"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : ""}/>
        </div>
         ,
         filterMethod: (filter, row) =>
         {
           
           const regx =  `.*${filter.value}.*`;
           return row[filter.id].toString().match(regx)
         }
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
        ),
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-prix">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="text"
          id="date-input-prix"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : ""}/>
        </div>
         ,
         filterMethod: (filter, row) =>
         {
           
           const regx =  `.*${filter.value}.*`;
           return row[filter.id].toString().match(regx)
         }
      }
    ];

   if( this.props.type !== "choose-one" ){
columns.unshift(
  {
    Header:<div style={{backgroundColor :'#E4E4E4',border : "1px solid rgba(0,0,0,0.45)"}}>
<Checkbox 
    key={"check-all-location-key"}
     id="check-all-location-id"   
     style={{padding : 3}}
     checked={this.state.selectedAll}
     onChange={this.handleSelectAllLocationChange}
     color="primary"
  />
    </div> ,
  sortable: false,
  filterable: false,
    accessor: 'id',
    width: 50,

    Cell: props => <div className="cell">
      <Checkbox 
        value={props.value}
        key={`key-checkbox-table-location-${props.value}`}
        id={`id-checkbox-table-location-${props.value}`}
        onChange={e => this.handeleCheckCheckboxRow(e, props.value)}
        checked={this.checkRowIsSelected(props.value)}
        style={{padding : 3}}
        
      />
    </div>
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
       
        
          <LoadingComponent loading={this.state.loading !== undefined ? this.state.loading : false} />
          <ReactTable
            className="table"
            data={this.props.rows}
            filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
            columns={columns}
            defaultPageSize={this.props.type=== "choose-one" ? 5 :8}
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
