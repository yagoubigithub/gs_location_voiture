import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom";

import ReactTable from 'react-table'
import 'react-table/react-table.css'


//Mui
import IconButton from "@material-ui/core/IconButton";
import Checkbox from '@material-ui/core/Checkbox';
import { Dialog, Collapse, Grid, DialogContent } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import { searchVoiture, addToCorbeille, getVoiture } from '../../store/actions/voitureAction';

//icons

import PrintIconf from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import SearchIcon from '@material-ui/icons/Search';
import LoadingComponent from '../../utils/loadingComponent';



class FactureTable extends Component {
  state = {
    
    addToCorbeilleDialog: false,
    voitureDeletedId: null,
    rowsSelected: [],
    selectedAll: false,


  }
  componentWillReceiveProps(nextProps){
    if (nextProps.voiture) {
      this.setState({ ...nextProps.voiture });
    }
  }


  

  handleSearch = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    delete data.addToCorbeilleDialog;
    delete data.open;
    delete data.voitureDeletedId;
    delete data.rowsSelected;
    delete data.selectedAll;
    delete data.voitureSelected;
    console.log(data);
    this.props.searchVoiture(data)


  }

  handleSearchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog })
  }
  add_To_Corbeille = (id) => {
    this.setState({ voitureDeletedId: id })
    //popup
    this.handleOpenCloseaddToCorbeilleDialog();

  }
  handeleCheckCheckboxRow = (e, id) => {
    const rowsSelected = [...this.state.rowsSelected];
    if (this.checkRowIsSelected(id)) {
      //unselect
      rowsSelected.splice(rowsSelected.findIndex(item => id == item), 1)

    } else {
      //select
      rowsSelected.push(id);
    }

    this.setState({ rowsSelected })

  }
  checkRowIsSelected = (id) => {
    const rowsSelected = [...this.state.rowsSelected];
    return rowsSelected.filter(row => row == Number.parseInt(id)).length > 0
  }

  handleSelectAllVoitureChange = () => {
    let selectedAll = this.state.selectedAll ? false : true;
    const rowsSelected = [];
    if (selectedAll) {
      this.props.rows.map(item => {
        rowsSelected.push(item.id)
      })
    }
    this.setState({ selectedAll, rowsSelected })
  }

handleCloseOpenGallerieVoiture = ()=>{
  this.setState({openGallerie : !this.state.openGallerie})
}

handleSelectOneChange =  (voitureSelected) =>{
  this.setState({
    voitureSelected

  })
}
  render() {

    const columns = [
      {
        Header: 'Nom Client',
        accessor: 'client_nom',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
          ,
        
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
      }, {
        Header: 'Prénom ',
        accessor: 'client_prenom',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>),
          
      
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
      },  {
        Header: "Télephone",
        accessor: 'client_telephone',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>),
          filterMethod: (filter, row) =>
          {
            const regx =  `.*${filter.value}.*`;
            return row[filter.id].match(regx)
          },
            Filter: ({ filter, onChange }) =>
            <div className="searchtable-container">
            <label htmlFor="date-input-client_telephone">
              <SearchIcon className="searchtable-icon" />
            </label>
            
              <input type="text"
              id="date-input-client_telephone"
              className="searchtable-input"
             onChange={event => onChange(event.target.value)}
           
            value={filter ? filter.value : ""}/>
            </div>
      },{
        Header: 'Date Facture',
        accessor: 'facture_date',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value.replace('T', " ") : ""}</div>),
          filterMethod: (filter, row) =>
        {
          const regx =  `.*${filter.value}.*`;
          return row[filter.id].match(regx)
        },
        
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-facture_date">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="date"
          id="date-input-facture_date"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : new Date().toDateString()}/>
        </div>
      }]

      if( this.props.type !== "choose-one" ){
        columns.unshift(
        
    
          {
    
            Header: '  ',
            accessor: 'facture_number',
            width: 100,
            sortable: false,
            filterable: false,
            Cell: props => <div className="cell">
            
    
            
            <Link to={`/facture/${props.value}/facture`}>
              <IconButton size="small" onClick={() => this.add_To_Corbeille(props.value)}>
               <PrintIconf className="black" fontSize="small"></PrintIconf>
              </IconButton></Link> 
            </div>
          }
        )
      }
    return (
      <Fragment>
        <Dialog open={this.state.addToCorbeilleDialog} onClose={this.handleOpenCloseaddToCorbeilleDialog}>
          <h2>Deleted</h2>
          <button onClick={() => { this.props.addToCorbeille(this.state.voitureDeletedId); this.handleOpenCloseaddToCorbeilleDialog() }}>Delete</button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>Cancel</button>

        </Dialog>


       
        <div className="table-container">

          {/*
            recherche
            */}

         

          <Collapse in={this.state.rowsSelected.length > 0}>
            <IconButton >
              <PrintIconf className="black" fontSize="large"></PrintIconf>
            </IconButton>
            <IconButton  >
              <DeleteIcon className="red" fontSize="large"></DeleteIcon>
            </IconButton>


          </Collapse>
          <ReactTable
            className="table"
            data={this.props.rows}
            columns={columns}
            defaultPageSize={this.props.type=== "choose-one" ? 5 :8}
            filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          />
        </div>

      </Fragment>
    )
  }
}

const mapActionToProps = dispatch => {
  return {
    searchVoiture: (data) => dispatch(searchVoiture(data)),
    addToCorbeille: (id) => dispatch(addToCorbeille(id)),
    
    getVoiture: id => dispatch(getVoiture(id))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voiture: state.voiture.voiture
  };
};
export default connect(mapStateToProps, mapActionToProps)(FactureTable);