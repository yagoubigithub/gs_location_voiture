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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
      
    
    const head=[{ access : "numero", value: "N°" },{ access : "voiture_nom", value: "Voiture" },{ access : "voiture_matricule", value: "Matricule" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]
    
    let rows_to_print = [{...this.props.location,numero : 1}];
 
     const myPages =  rows_to_print.map((row,index)=>{
 
  
      return (<PageBon facture_number={row.id } client={{nom : row.client_nom,prenom : row.client_prenom,telephone :  row.client_telephone}} entreprise={this.props.entreprise} head={head} key={`pageCompnent-${index}`} index={index} rows_to_print={rows_to_print}/>)
      
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
        box-shadow: 0px 0px 5px 2px black;
      }
      
      
      .print-page-content table td{
         text-align: center;
         
         border : 1px solid black;
         box-shadow: 0px 0px 5px 2px black;
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
        
        padding : 5px;
      }
      .client-information{
        
        padding : 5px;
      }
      .entreprise-information p,h4 {
        margin: 0;
        font-size: 20px;
        margin-left  : 5px;
      }
      .client-information p,h4 {
        margin: 0;
        font-size: 20px;
        margin-left  : 5px;
      }
      .print-page-head {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
      }
      .prix-totale{
        display: flex;
        justify-content: flex-end;
        padding : 15px;
        
      }
      .prix-totale span{
        font-size: 20px;
        font-weight: bolder;
        background-color: yellow;
        padding : 4px;
      }
      .logo-facture{
        width : 100%;
        height : 150px;
        background-image: url('data:image/jpeg;base64,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') !important;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -webkit-print-color-adjust: exact;
        
      }
      .print-page-container h1{
        text-align: center;
        font-size: 45px;
       border-bottom: 1px solid rgba(0,0,0,0.3);
       padding-bottom: 15px;
      }
      
      .print-page-footer-contart{
        display: flex;
      }
      .print-page-footer-contart div{
      width : 50%;
      padding-bottom: 100px;
      padding-left: 20px;
      
      }
      .print-page-footer-contart .print-page-footer-contart-sign{
        text-align: end;
        padding-right: 5px;
      }
      .print-page-content ul {
        display: flex;
        flex-wrap: wrap;
      }
      .print-page-content  li{
      min-width : 50%;
      padding-bottom : 15px;
      font-size: 18px;
      }
      .entreprise-information-contrat{
      width : 100%;
      padding : 15px;
      box-shadow: 1px 1px 4px 3px rgba(	0, 0, 0,0.8);
      font-size: 20px;
      display: flex;
      flex-wrap: wrap;
      }
      .entreprise-information-contrat p{
        display: block;
        min-width:  50% !important;
        
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
         <AppBar className="bg-dark">
          <Toolbar style={{display : "flax", justifyContent : "space-between"}}>
            <Link to="/location/">
              <IconButton onClick={this.handleClose} style={{color : "white"}}>
              <ArrowBackIcon />
              </IconButton>
            </Link>
        

            <Button
              color="primary"
              variant="contained"
            
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