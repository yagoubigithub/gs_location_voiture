import React, { Component } from "react";



 class ContartPage extends Component {
   state={

   client :{

   }

   }

 
 
 
  render() {
    return (
      <div className="print-page-container">
      <div className={"logo-facture"}>
          
      </div>
        <div>
        <h1 >Contrat de location</h1>
        </div>
        <div className="print-page-head print-page-head-contrat">

          <div className="entreprise-information-contrat" style={{margin : 5}}>
          <p><b>N.RC : </b><span dir="rtl">{"91 ا 0086165 - 00/31"}</span></p>
            <p><b>Agence</b> : {this.props.entreprise.nom}</p>
            <p><b>Email</b> : {this.props.entreprise.email}</p>
            <p><b>Télephone</b> : {this.props.entreprise.telephone}</p>
            <p><b>Adresse</b> : {this.props.entreprise.adresse}</p>
   
          </div>



        </div>
        <div className="print-page-content">
       
        { <ul> <li><b>N°:</b>  { this.props.id }</li>
            <li><b>Date du Contrat :</b>  { new Date().toISOString().split('T')[0]}</li>
            <li><b>Nom :</b> {this.props.client.client_nom}</li>
            <li><b>Prénom :</b> { this.props.client.client_prenom}</li>
            <li><b>Date de naissance :</b> { this.props.client.date_naissance}</li>
            <li><b>Nationalité :</b> Algerie</li>
            <li><b>Adresse :</b> { this.props.client.adresse}</li>
            <li><b>Télephone :</b> {this.props.client.client_telephone}</li>
            <li><b>P.CN°  :</b> { this.props.client.numero_cart_client}</li>
            <li><b>Depart Km :</b> {this.props.client.km}</li>
            <li><b>Sortie Le :</b> {this.props.client.date_sortie.replace("T", " ")}</li>
            <li><b>Entrer le :</b> {this.props.client.date_entree.replace("T", " ")}</li>
           
           <li><b>Nombre de jours:</b> {(new Date(this.props.client.date_entree).getTime() - new Date(this.props.client.date_sortie).getTime()) / (1000 * 3600 * 24)}</li>
           
            
           </ul>  }
           <h3>Voiture Information :</h3>
           {<ul>
            <li><b>Nom :</b> {this.props.client.voiture_nom}</li> 
            
               <li><b>Matricule :</b> {this.props.client.voiture_matricule}</li> 
               <li><b>modéle :</b> {this.props.client.modele}</li> 
               <li><b>Coleur :</b> {this.props.client.coleur}</li> 
           </ul>}
           
       
               </div>
               <div className="print-page-footer-contart">
                   <div>
                       <h4>Le Gerant</h4>
                   </div>
                   <div className="print-page-footer-contart-sign">
                       <h4>SIGNATEUR DE L'INTERESS</h4>
                   </div>
               </div>
       
      </div>
    );
  }
}




  
  export default ContartPage