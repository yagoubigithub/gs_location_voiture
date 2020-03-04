import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom";

import ReactTable from 'react-table'
import 'react-table/react-table.css'



//Mui
import IconButton from "@material-ui/core/IconButton";

import { Dialog, Collapse, Grid, DialogContent } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import { searchVoiture, addToCorbeille, getVoiture,getDirename } from '../../store/actions/voitureAction';

//icons

import PrintIconf from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PermMediaIcon from '@material-ui/icons/PermMedia';

import LoadingComponent from '../../utils/loadingComponent';




class VoitureTable extends Component {
  state = {
    openGallerie : false,
    addToCorbeilleDialog: false,
    voitureDeletedId: null,
    rowsSelected: [],
    selectedAll: false,
    images : [],
    voitureSelected :{}

  }
  componentWillReceiveProps(nextProps){
    if (nextProps.voiture) {
      this.setState({ ...nextProps.voiture });
    }
  }
  componentWillMount(){
    this.props.getDirename();
  }
  componentWillUnmount(){
    switch(this.props.type){
      case "choose-one":
          const voitureSelected = {...this.state.voitureSelected};
          this.props.sendData(voitureSelected);
      break;
      default :
      break;
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
        Header: 'Nom',
        accessor: 'nom',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Modéle',
        accessor: 'modele',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Marque',
        accessor: 'marque',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: "L'année",
        accessor: 'annee',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: "Coleur",
        accessor: 'coleur',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Matricule',
        accessor: 'matricule',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Disponibilité',
        accessor: 'disponibilite',
        Cell: props =>{
          if(props.value === "enPane"){
            return(<div className="cell" >{props.value !== "undefined" ? "En Panne" : ""}</div>)
          }else{
            return(<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
          }
        }
         
      }, {
        Header: 'Prix par jour',
        accessor: 'prix',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }]

      if( this.props.type !== "choose-one" ){
        columns.unshift(
         
          {
    
            Header: '  ',
            accessor: 'id',
            width: 100,
            sortable: false,
            filterable: false,
            Cell: props => <div className="cell">
              <IconButton size="small" onClick={()=>{this.handleCloseOpenGallerieVoiture();this.props.getVoiture(props.value)}}>
                <PermMediaIcon className="black" fontSize="small"></PermMediaIcon>
              </IconButton>
    
              <IconButton size="small" onClick={() => this.add_To_Corbeille(props.value)}>
                <DeleteIcon className="red" fontSize="small"></DeleteIcon>
              </IconButton>
              <IconButton size="small">
                <Link to={`/voiture/modifier/${props.value}`}>  <EditIcon className="black" fontSize="small"></EditIcon></Link>
              </IconButton>
    
            </div>
          }
        )
      }else{

        columns.unshift(
          {
            Header: "  ",
            accessor: "id",
            width: 50,
            sortable: false,
            filterable: false,
            Cell: props => {
            return (  <div className="cell"><input type="radio" name="select-voiture" checked={props.value === this.state.voitureSelected.id} onChange={()=>this.handleSelectOneChange(props.original)} /></div>)
            }
          }
        )
      }

      const loc = window.location.pathname;
const dir = loc.substring(0, loc.lastIndexOf('/'));
    return (
      <Fragment>
        <Dialog open={this.state.addToCorbeilleDialog} onClose={this.handleOpenCloseaddToCorbeilleDialog}>
          <h2>Deleted</h2>
          <button onClick={() => { this.props.addToCorbeille(this.state.voitureDeletedId); this.handleOpenCloseaddToCorbeilleDialog() }}>Delete</button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>Cancel</button>

        </Dialog>


        <Dialog scroll="paper" open={this.state.openGallerie} onClose={this.handleCloseOpenGallerieVoiture}>
        <DialogContent dividers={true}>
          <LoadingComponent
            loading={
              this.props.loading !== undefined ? this.props.loading : false
            }
          />
          <div>
            <Grid container>
            {this.props.voiture !== undefined ?  <img
                      style={{ maxHeight: 200, width: "100%", height: "100%" }}
                      src={`file:/${this.props.direname}/../../../${this.props.voiture.image}`}
                    /> : null}
            </Grid>
          </div>
        </DialogContent>
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
            defaultPageSize={this.props.type=== "choose-one" ? 5 :20}

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
    getDirename : ()=>dispatch(getDirename()),
    
    getVoiture: id => dispatch(getVoiture(id))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voiture: state.voiture.voiture,
    direname :  state.voiture.direname
  };
};
export default connect(mapStateToProps, mapActionToProps)(VoitureTable);