import React, { Component } from "react";



 class PageComponent extends Component {

 
  render() {
    return (
      <div className="print-page-container">
        <div>
        <h1 style={{textAlign : "center",border : "1px solid black"}}>Facture N°{this.props.facture_number}</h1>
        </div>
        <div className="print-page-head">

          <div className="entreprise-information">
            <p><b>Agence</b> : {this.props.entreprise.nom}</p>
            <p><b>Email</b> : {this.props.entreprise.email}</p>
            <p><b>Télephone</b> : {this.props.entreprise.telephone}</p>
            <p><b>Adresse</b> : {this.props.entreprise.adresse}</p>
   
          </div>

<div className="client-information">
<h4>Client Information : </h4>
<p><b>Nom</b> : {this.props.client.nom}</p>
<p><b>Prénom</b> : {this.props.client.prenom}</p> 
<p><b>Télephone</b> : {this.props.client.telephone}</p> 
<p><b>date de facture</b> : {this.props.facture_date}</p>
    

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
          <div className="prix-totale"><span>Prix Totale : {this.props.prix_totale_t}</span></div>
        </div>
       
      </div>
    );
  }
}

  
  export default PageComponent