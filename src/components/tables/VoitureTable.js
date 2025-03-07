import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import ReactTable from 'react-table'
import 'react-table/react-table.css'



//Mui
import IconButton from "@material-ui/core/IconButton";

import { Dialog, Collapse, Grid, DialogContent, Checkbox } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import { searchVoiture, addToCorbeille, getVoiture , getImages , undoDeleteVoiture } from '../../store/actions/voitureAction';

//icons

import PrintIconf from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import UndoIcon from '@material-ui/icons/Undo';
import SearchIcon from '@material-ui/icons/Search';


import LoadingComponent from '../../utils/loadingComponent';




class VoitureTable extends Component {
  state = {
    openGallerie : false,
    addToCorbeilleDialog: false,
    voitureDeletedId: null,
    rowsSelected: this.props.rowsSelected,
    selectedAll: false,
    images : [],
    voitureSelected :{},
    selectedAll : false

  }
  componentWillReceiveProps(nextProps){
    if (nextProps.voiture) {
      this.setState({ ...nextProps.voiture });
    }
    if(nextProps.images){
      this.setState({images : nextProps.images})
    }
    if (nextProps.rowsSelected) {
      this.setState({ rowsSelected : nextProps.rowsSelected });
    }
    if(nextProps.rows.length !== this.props.rows.length)
    {
      this.setState({selectedAll  : false})

    }
    
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

    if(rowsSelected.length === 0) this.setState({selectedAll : false})
    this.setState({ rowsSelected }, ()=>{
      this.props.sendData(rowsSelected)
    })

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
    this.setState({ selectedAll, rowsSelected },()=>{
      this.props.sendData(rowsSelected)
    })
  }

handleCloseOpenGallerieVoiture = ()=>{
  this.setState({openGallerie : !this.state.openGallerie,images : []})
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
        Header: 'Modéle',
        accessor: 'modele',
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
          <label htmlFor="date-input-modele">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-modele"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      }, {
        Header: 'Marque',
        accessor: 'marque',
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
          <label htmlFor="date-input-marque">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-marque"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      }, {
        Header: "L'année",
        accessor: 'annee',
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
          <label htmlFor="date-input-annee">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-annee"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
          
      }, {
        Header: "Coleur",
        accessor: 'coleur',
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
          <label htmlFor="date-input-coleur">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-coleur"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      }, {
        Header: 'Matricule',
        accessor: 'matricule',
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
          <label htmlFor="date-input-matricule">
            <SearchIcon className="searchtable-icon" />
          </label>
          
            <input type="text"
            id="date-input-matricule"
            className="searchtable-input"
           onChange={event => onChange(event.target.value)}
         
          value={filter ? filter.value : ""}/>
          </div>
      }, {
        Header: "Date de fin de l'assurance",
        accessor: 'assurance_fin',
        width : 190,
        Filter: ({ filter, onChange }) =>
        <div className="searchtable-container">
        <label htmlFor="date-input-assurance_fin">
          <SearchIcon className="searchtable-icon" />
        </label>
        
          <input type="date"
          id="date-input-assurance_fin"
          className="searchtable-input"
         onChange={event => onChange(event.target.value)}
       
        value={filter ? filter.value : new Date().toDateString()}/>
        </div>
        
      
    ,
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
      }, {
        Header: 'Disponibilité',
        accessor: 'disponibilite',
        width : 120,
        Cell: props =>{
          if(props.value === "enPane"){
            return(<div className="cell" >{props.value !== "undefined" ? "En Panne" : ""}</div>)
          }else{
            return(<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
          }
        },
        filterMethod: (filter, row) =>
        {
          if(filter.value === "all") return true;
          else
          return row[filter.id] === filter.value   ;
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">Afficher tout</option>
            <option value="disponible">disponible</option>
            <option value="loué">loué</option>
            <option value="enPane">En Panne</option>
          </select>
         
      }, {
        Header: 'Prix par jour',
        accessor: 'prix'
        , width : 120,
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
        </div>,
        Cell: props =>
          (<div className="cell" >{props.value !== "undefined" ? props.value : ""}</div>)
          ,
          filterMethod: (filter, row) =>
          {
            
            const regx =  `.*${filter.value}.*`;
            return row[filter.id].toString().match(regx)
          }
      }]

      
    
      if( this.props.IconsColumn ){
        columns.unshift(
        
          {
    
            Header: '  ',
            accessor: 'id',
            width: 100,
            sortable: false,
            filterable: false,
            Cell: props => 
            {
              if (this.props.type === "corbeille") {
                return  <div className="cell"><IconButton
                size="small"
                onClick={() => this.props.undoDeleteVoiture(props.value)}
              >
                <UndoIcon className="black" fontSize="small"></UndoIcon>
              </IconButton></div> ;
              }else{
                return( <div className="cell">
                <IconButton size="small" onClick={()=>{this.handleCloseOpenGallerieVoiture();this.props.getImages(props.value)}}>
                  <PermMediaIcon className="black" fontSize="small"></PermMediaIcon>
                </IconButton>
      
                <IconButton size="small" onClick={() => this.add_To_Corbeille(props.value)}>
                  <DeleteIcon className="red" fontSize="small"></DeleteIcon>
                </IconButton>
                <IconButton size="small">
                  <Link to={`/voiture/modifier/${props.value}`}><EditIcon className="black" fontSize="small"></EditIcon></Link>
                </IconButton>
      
              </div>)
              }
            }
           
          }
        )
      }

      if(this.props.checkBoxColumn){
        columns.unshift(
          {
            Header:<div style={{backgroundColor :'#E4E4E4',border : "1px solid rgba(0,0,0,0.45)"}}>
    <Checkbox 
            key={"check-all-voiture-key"}
             id="check-all-voiture-id"   
             style={{padding : 3}}
             checked={this.state.selectedAll }
             onChange={this.handleSelectAllVoitureChange}
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
                key={`key-checkbox-table-voiture-${props.value}`}
                id={`id-checkbox-table-voiture-${props.value}`}
                onChange={e => this.handeleCheckCheckboxRow(e, props.value)}
                checked={this.checkRowIsSelected(props.value)}
                style={{padding : 3}}
                
              />
            </div>
          }
        )
      }
      if(this.props.chooseOneColumn){
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
  

let images = null;
if(this.state.images !== undefined){
 images =   this.state.images.map((image,index)=>{
   

  return (<img
    style={{ maxHeight: 200, width: "100%", height: "100%" }}
    key={`image-${index}`} src={image.image}
  />)
  })
}
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
            
            {images.length > 0 ? images : <p>No  Images</p>}
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
        <div className="table-container">

          {/*
            recherche
            */}

         

          
          <ReactTable
            className="table"
            data={this.props.rows}
            filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
            columns={columns}
            defaultPageSize={this.props.type=== "choose-one" ? 5 : 8}

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
    getImages: id => dispatch(getImages(id)),
    undoDeleteVoiture :  (id) => dispatch(undoDeleteVoiture(id)),
    getVoiture: id => dispatch(getVoiture(id))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.voiture.loading,
    voiture: state.voiture.voiture,
    direname :  state.voiture.direname,
    images :  state.voiture.images
  };
};
export default connect(mapStateToProps, mapActionToProps)(VoitureTable);