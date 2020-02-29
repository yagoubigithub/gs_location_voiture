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
export default class PrintComponent extends Component {
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
      
        return (<PageComponent head={this.props.head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
        
      })
      const w = window.open();
    
      w.document.write( `<style>
      .print-page-container{
        display: flex;;
        flex-direction: column;
        background: white;
        min-height: 297mm;
        height:297mm;
        width:210mm
       
        
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
        .print-page-content table,thead,tbody,tr{
          width :100%;
          max-width:  100%;
         
        }
        .print-page-content table tbody tr  td   {
        
         text-overflow: ellipsis;
         overflow: hidden;
         
         font-size: 12px;
        }
        .print-page-content table,  td  {
          border : 1px solid black;
        }
        .print-page-content table th{
          border-right:  1px solid black;
        }
        
        .print-page-content table th:last-child{
          border-right:  none;
        }
        .print-page-content table td{
          border-right:  none; 
          border-bottom:  none; 
        }
        .print-page-content table td:first-child{
          border-left:  none;
        }
        .print-page-container .print-page-footer{
          position: relative;
          
        }
        .print-page-container .print-page-footer span{
          position: absolute;
          bottom:   5px;
          right : 15px;
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
    console.log(row);
    return (<PageComponent head={this.props.head} key={`pageCompnent-${index}`} index={index} rows_to_print={row}/>)
    
  })
}
      
        </div>
      </Dialog>
    )
  }
}
