import React, { Component } from 'react'

import { Link } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';


//Mui
import { Dialog } from '@material-ui/core'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";



//icons
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import PageComponent from './PageComponent';

//redux
import {connect} from "react-redux";
import {getFacture } from '../store/actions/factureAction'


import {removeFactureId} from '../store/actions/locationAction';
 class PrintFacture extends Component {
  state = {
    open: true,
    facture : {}
  } 

  componentWillUnmount(){
    this.props.removeFactureId();
  }
 
  componentDidMount(){
    const id = this.props.match.params.id;
    console.log(this.props)
    this.props.getFacture(id);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.facture){
      this.setState({facture : nextProps.facture})
    }
  }

  
  print =() =>{
      
    
    const head=[{ access : "numero", value: "Numero" },{ access : "voiture_nom", value: "Voiture" },{ access : "voiture_matricule", value: "Matricule" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]
    
    let rows_to_print = [];
    const factures = this.props.facture;
    let prix_totale_t = 0;

    
    
    if(factures !== undefined){
      factures.map(f=>{
        prix_totale_t = prix_totale_t + parseInt(f.prix_totale);
      })
      for (let i = 0; i < factures.length; i = i + 3) {
      const r = [];
      r.push(factures[i], factures[i+1] ,factures[i+2], factures[i+3] , factures[i+4] , factures[i+5] , factures[i+6] , factures[i+7]);

      if(factures[i] !== undefined)
      factures[i].numero =  i+1;
      if(factures[i + 1] !== undefined)
      factures[i + 1].numero = i+2;
      if(factures[i + 2] !== undefined)
      factures[i +2 ].numero = i+3;
      if(factures[i + 3] !== undefined)
      factures[i +3 ].numero = i+4;
      if(factures[i + 4] !== undefined)
      factures[i +4 ].numero = i+5;
      if(factures[i + 5] !== undefined)
      factures[i +5 ].numero = i+6;
      if(factures[i + 6] !== undefined)
      factures[i +6 ].numero = i+7;
      if(factures[i + 7] !== undefined)
      factures[i + 7 ].numero = i+8;
      rows_to_print.push(r);
      
    } 
    
    }
     const myPages =  rows_to_print.map((row,index)=>{
      
        return (<PageComponent facture_date={row[0].facture_date} prix_totale_t={prix_totale_t} facture_number={row[0].facture_number } client={{nom : row[0].client_nom,prenom : row[0].client_prenom,telephone :  row[0].client_telephone}} entreprise={this.props.entreprise} head={head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
        
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
.prix-totale{
  display: flex;
  justify-content: flex-end;
  padding : 15px;
}

      </style>
      ${ ReactDOMServer.renderToString(myPages)}
` );

    
    w.print();
    w.close();

    
  
    }
  render() {
    const head=[{ access : "numero", value: "Numero" },{ access : "voiture_nom", value: "Voiture" },{ access : "voiture_matricule", value: "Matricule" },{ access : "date_sortie", value: "Date Sortie" },{ access : "date_entree", value: "Date Entrée" },{ access : "remise", value: "Remise" },{ access : "prix_totale", value: "Prix Totale" }]
    
    let rows_to_print = [];
    const factures = this.props.facture;
    let prix_totale_t = 0;

    
    
    if(factures !== undefined){
      factures.map(f=>{
        prix_totale_t = prix_totale_t + parseInt(f.prix_totale);
      })
      for (let i = 0; i < factures.length; i = i + 3) {
      const r = [];
      r.push(factures[i], factures[i+1] ,factures[i+2], factures[i+3] , factures[i+4] , factures[i+5] , factures[i+6] , factures[i+7]);

      if(factures[i] !== undefined)
      factures[i].numero =  i+1;
      if(factures[i + 1] !== undefined)
      factures[i + 1].numero = i+2;
      if(factures[i + 2] !== undefined)
      factures[i +2 ].numero = i+3;
      if(factures[i + 3] !== undefined)
      factures[i +3 ].numero = i+4;
      if(factures[i + 4] !== undefined)
      factures[i +4 ].numero = i+5;
      if(factures[i + 5] !== undefined)
      factures[i +5 ].numero = i+6;
      if(factures[i + 6] !== undefined)
      factures[i +6 ].numero = i+7;
      if(factures[i + 7] !== undefined)
      factures[i + 7 ].numero = i+8;
      rows_to_print.push(r);
      
    } 
    
    }
    return (
      <Dialog fullScreen open={this.state.open}>
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
          </Toolbar>
        </AppBar>

        <div style={{ background: "gray", paddingTop : 70, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>

{
  
   
  rows_to_print.map((row,index)=>{
 
  
    return (<PageComponent facture_date={row[0].facture_date} prix_totale_t={prix_totale_t} facture_number={row[0].facture_number } client={{nom : row[0].client_nom,prenom : row[0].client_prenom,telephone :  row[0].client_telephone}} entreprise={this.props.entreprise} head={head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
    
  })
}
      
        </div>
      </Dialog>
    )
  }
}
const mapStateToProps = state =>{
  return {

    facture :  state.facture.facture,
    loading :  state.location.loading,
    entreprise : state.entreprise.info
  }
}
const mapActionToProps = dispatch =>{
  return {
    getFacture : (id)=>dispatch(getFacture(id)),
    removeFactureId : () =>dispatch(removeFactureId())

  }
}
export default  connect (mapStateToProps,mapActionToProps)(PrintFacture);