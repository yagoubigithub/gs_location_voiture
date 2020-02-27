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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

class ClientTable extends Component {
  state = {
    openGallerie : false,
    addToCorbeilleDialog: false,
    clientDeletedId: null,
    rowsSelected: [],
    selectedAll: false,
    images : []

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
    delete data.clientDeletedId;
    delete data.rowsSelected;
    delete data.selectedAll;
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
    this.setState({ clientDeletedId: id })
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

  handleSelectAllClientChange = () => {
    let selectedAll = this.state.selectedAll ? false : true;
    const rowsSelected = [];
    if (selectedAll) {
      this.props.rows.map(item => {
        rowsSelected.push(item.id)
      })
    }
    this.setState({ selectedAll, rowsSelected })
  }


  render() {

    const columns = [
      {
        Header: <div style={{ backgroundColor: '#E4E4E4', border: "1px solid rgba(0,0,0,0.45)" }}>
          <Checkbox
            key={"check-all-client-key"}
            id="check-all-client-id"
            style={{ padding: 3 }}
            checked={this.state.selectedAll}
            onChange={this.handleSelectAllClientChange}
            color="primary"
          />
        </div>,
        sortable: false,
        filterable: false,
        accessor: 'id',
        width: 50,

        Cell: props => <div className="cell">
          <Checkbox
            value={props.value}
            key={`key-checkbox-table-client-${props.value}`}
            id={`id-checkbox-table-client-${props.value}`}
            onChange={e => this.handeleCheckCheckboxRow(e, props.value)}
            checked={this.checkRowIsSelected(props.value)}
            style={{ padding: 3 }}

          />
        </div>
      },

      {

        Header: '  ',
        accessor: 'id',
        width: 100,
        sortable: false,
        filterable: false,
        Cell: props => <div className="cell">
       

          <IconButton size="small" onClick={() => this.add_To_Corbeille(props.value)}>
            <DeleteIcon className="red" fontSize="small"></DeleteIcon>
          </IconButton>
          <IconButton size="small">
            <Link to={`/client/modifier/${props.value}`}>  <EditIcon className="black" fontSize="small"></EditIcon></Link>
          </IconButton>

        </div>
      }, {
        Header: 'Nom',
        accessor: 'nom',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Prénom',
        accessor: 'prenom',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Télephone',
        accessor: 'telephone',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: "Email",
        accessor: 'email',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: "Adresse",
        accessor: 'adresse',
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: "Confiance",
        accessor: 'confiance',
        Cell: props =>{
          if(props.value !== undefined){
            if(props.value=== "confiance"){
              return <div className="cell">
              <CheckIcon />

              </div>
            }else{
              return  <div className="cell">
              <CloseIcon />

              </div>
            }
          }
        }
         
      }]


    return (
      <Fragment>
        <Dialog open={this.state.addToCorbeilleDialog} onClose={this.handleOpenCloseaddToCorbeilleDialog}>
          <h2>Deleted</h2>
          <button onClick={() => { this.props.addToCorbeille(this.state.clientDeletedId); this.handleOpenCloseaddToCorbeilleDialog() }}>Delete</button>
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
              {this.state.images.map(image => {
                return (
                  <Grid item xs={4} key={image.image}>
                    <img
                      style={{ maxHeight: 200, width: "100%", height: "100%" }}
                      src={`../../images/${image.image}`}
                    />
                  </Grid>
                );
              })}
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
            defaultPageSize={20}

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
export default connect(mapStateToProps, mapActionToProps)(ClientTable);