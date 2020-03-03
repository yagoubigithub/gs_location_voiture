import React, { Component } from 'react'

import { Link } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';


//Mui
import { Dialog } from '@material-ui/core'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

import LoadingComponent from '../utils/loadingComponent';


//icons
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import PageBon from './PageBon';

//redux
import {connect} from "react-redux";



import {removeFactureId , getLocation} from '../store/actions/locationAction';
import {voitureEntree } from '../store/actions/voitureAction';
 class PrintFacture extends Component {
  state = {
    open: true,
    facture : {},
    voitureEntree : false
  } 

  componentWillUnmount(){
    this.props.removeFactureId();
  }
 
  componentDidMount(){
    const id = this.props.match.params.id;
    console.log(this.props)
    this.props.getLocation(id);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.location){
      this.setState({location : nextProps.location})
    }
    if(nextProps.loading !== undefined){
        this.setState({loading : nextProps.loading})
    }
    
  }

  
  print =() =>{
      
    
    let rows_to_print = [];
    const factures = this.props.facture;
    if(factures !== undefined){
      for (let i = 0; i < factures.length; i = i + 3) {
      const r = [];
      r.push(factures[i], factures[i+1] ,factures[i+2]);

      if(factures[i] !== undefined)
      factures[i].numero =  i+1;
      if(factures[i + 1] !== undefined)
      factures[i + 1].numero = i+2;
      if(factures[i + 2] !== undefined)
      factures[i +2 ].numero = i+3;

      rows_to_print.push(r);
      
    } 
    
    }
    const head=[{ access : "numero", value: "Numero" },{ access : "voiture_nom", value: "Voiture" },{ access : "voiture_matricule", value: "Matricule" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]
 
     const myPages =  rows_to_print.map((row,index)=>{
      
        return (<PageBon facture_number={row[0].facture_number } client={{nom : row[0].client_nom,prenom : row[0].client_prenom,telephone :  row[0].client_telephone}} entreprise={this.props.entreprise} head={head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
        
      })
      const w = window.open();
    
      w.document.write( `<style>

      .print-page-container{
        box-sizing: border-box;
      display: flex;;
      flex-direction: column;
      background: white;
      min-height: 1170px;
      max-height: 1170px;
      height: 1170px;
      width : 827px;
      margin-bottom: 15px;
      
      }
      .print-page-head{
        flex :5;
       
      }
      .print-page-content{
        flex : 14;
       
      }
      .print-page-footer{
        flex : 1;
        
      }
      
      
      .print-page-content table,.print-page-content table thead,.print-page-content table tbody,.print-page-content table tr{
        width :100%;
        max-width:  100%;
       
      }
      .print-page-content table tbody tr  td   {
      
       text-overflow: ellipsis;
       overflow: hidden;
      
       
      }
      .print-page-content table,   .print-page-content table td  {
        
        padding-bottom: 10px;
      }
      .print-page-content table th{
        border:  1px solid black;
      }
      
      
      .print-page-content table td{
         text-align: center;
         
         border : 1px solid black;
      }
      .print-page-content table td:first-child{
        
      }
      .print-page-container .print-page-footer{
        position: relative;
        
      }
      .print-page-container .print-page-footer span{
        position: absolute;
        bottom:   5px;
        right : 15px;
      
      }
      .entreprise-information{
        border: 1px solid gray;
        padding : 5px;
      }
      .client-information{
        border: 1px solid gray;
        padding : 5px;
      }
      .entreprise-information p,h4 {
        margin: 0;
      }
      .client-information p,h4 {
        margin: 0;
      }
      .print-page-head {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
      }
      </style>
      ${ ReactDOMServer.renderToString(myPages)}
` );

    
    w.print();
    w.close();

    
  
    }
 
  render() {
const head=[{ access : "numero", value: "N°" },{ access : "voiture_nom", value: "Voiture" },{ access : "voiture_matricule", value: "Matricule" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]
    
    let rows_to_print = [{...this.props.location,numero : 1}];
    let livreeBtn;
    if(this.props.location !== undefined){
            livreeBtn = this.props.location.voiture_disponibilite === "loué" ? <Button
    color="primary"
    variant="contained"
    style={{ marginLeft: 100 }}
    onClick={()=>this.props.voitureEntree(this.props.location.voiture_id)}

  >
  La voiture a été livrée
  </Button> : null;
    }
 
    
    return (
      <Dialog fullScreen open={this.state.open}>
         <LoadingComponent loading={this.state.loading !== undefined ? this.state.loading : false} />
        <AppBar color="secondary">
          <Toolbar>
            <Link to="/location/">
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Link>
            <h4 style={{ textAlign: "center" }}>Print</h4>

            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: 100 }}
              onClick={this.print}

            >
              <PrintIcon />
            </Button>
{livreeBtn}
           
          </Toolbar>
        </AppBar>

        <div style={{ background: "gray", paddingTop : 70, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>

{
  
   
  rows_to_print.map((row,index)=>{
 
  
    return (<PageBon facture_number={row.id } client={{nom : row.client_nom,prenom : row.client_prenom,telephone :  row.client_telephone}} entreprise={this.props.entreprise} head={head} key={`pageCompnent-${index}`} index={index} rows_to_print={rows_to_print}/>)
    
  })
}
      
        </div>
      </Dialog>
    )
  }
}
const mapStateToProps = state =>{
  return {

    location :  state.location.location,
    loading :  state.voiture.loading,
    entreprise : state.entreprise.info,
  
  }
}
const mapActionToProps = dispatch =>{
  return {
    getLocation : (id)=>dispatch(getLocation(id)),
    voitureEntree : (id)=>dispatch(voitureEntree(id)),
    removeFactureId : () =>dispatch(removeFactureId()),
   

  }
}
export default  connect (mapStateToProps,mapActionToProps)(PrintFacture);