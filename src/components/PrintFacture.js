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
import {getLocation} from '../store/actions/locationAction'

 class PrintFacture extends Component {
  state = {
    open: true
  } 

 

  
  print =() =>{
      
    
    let rows_to_print = [];
    
    for (let i = 0; i < this.props.rows.length; i = i + 3) {
      const r = [];
      r.push(this.props.rows[i], this.props.rows[i+1] ,this.props.rows[i+2]);
      rows_to_print.push(r);
      
    }

 
     const myPages =  rows_to_print.map((row,index)=>{
      
        return (<PageComponent facture_number={row[0].id } client={{nom : row[0].client_nom,prenom : row[0].client_prenom,telephone :  row[0].client_telephone}} entreprise={this.props.entreprise} head={this.props.head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
        
      })
      const w = window.open();
    
      w.document.write( `<style>

  
.print-page-container{
  display: flex;;
  flex-direction: column;
  background: white;
  min-height: 1170px;
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
    
    padding-bottom: 200px;
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
    let rows_to_print = [];
    if(this.props.rows !== undefined){
      for (let i = 0; i < this.props.rows.length; i = i + 3) {
      const r = [];
      r.push(this.props.rows[i], this.props.rows[i+1] ,this.props.rows[i+2]);
      rows_to_print.push(r);
      
    } 
    
    }
    return (
      <Dialog fullScreen open={this.state.open}>
        <AppBar color="secondary">
          <Toolbar>
            <Link to={this.props.ReturnPath}>
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
   
   
    return (<PageComponent facture_number={row[0].id } client={{nom : row[0].client_nom,prenom : row[0].client_prenom,telephone :  row[0].client_telephone}} entreprise={this.props.entreprise} head={this.props.head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
    
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
    loading :  state.location.loading
  }
}
const mapActionToProps = dispatch =>{
  return {
    getLocation : (id)=>dispatch(getLocation(id))

  }
}
export default  connect (mapStateToProps,mapActionToProps)(PrintFacture);