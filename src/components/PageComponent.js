import React, { Component } from "react";



 class PageComponent extends Component {

 
  render() {
    return (
      <div className="print-page-container">
        <div>
        <h1 style={{textAlign : "center"}}>Facture N°{this.props.facture_number}</h1>
        </div>
        <div className="print-page-head">

          <div className="entreprise-information">
            <h6>Agence : {this.props.entreprise.nom}</h6>
            <h6>Email : {this.props.entreprise.email}</h6>
            <h6>Télephone : {this.props.entreprise.telephone}</h6>
            <h6>Adresse : {this.props.entreprise.adresse}</h6>
   
          </div>

<div className="client-information">
<h6>Nom : {this.props.client.nom}</h6>
<h6>Prénom : {this.props.client.prenom}</h6> 
<h6>date de facture : 29/02/20</h6>
    

</div>

        </div>
        <div className="print-page-content">
          <table>
            <thead>
              <tr>
                {this.props.head.map((title, index) => {
                  return <th key={index}>{title.value}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.rows_to_print.map((row, index) => {
                if (row !== undefined) {
                  return (
                    <tr key={`tbody-tr-${index}`}>
                      {this.props.head.map((title, index) => {
                        return (
                          <td key={`tbody-td-${index}`}>{row[title.access]}</td>
                        );
                      })}
                    </tr>
                  );
                } else return null;
              })}
            </tbody>
          </table>
        </div>
        <div className="print-page-footer">
          <span>{this.props.index + 1}</span>
        </div>
      </div>
    );
  }
}

  
  export default PageComponent