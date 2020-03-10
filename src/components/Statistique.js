import React, { Component } from "react";

import randomColor from "randomcolor";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Bar, BarChart, Tooltip, Legend } from 'recharts';
//redux

import { connect } from "react-redux";
import { getAllVoitureStatistique } from "../store/actions/voitureAction";


class Statistique extends Component {
  state = {
    statistique: []
  };
  componentWillMount() {
    this.props.getAllVoitureStatistique();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.voitureStatistique) {
      const statistique = [];
      
      
     
 
        nextProps.voitureStatistique.map(s => {
            const color = randomColor();
         statistique.push({
             name :  s.nom,
             revenu : s.value 
         })
            
          });
          console.log(statistique);
          this.setState({ statistique });
      
    
    }
  }
  render() {
       
    
    return (
      <div style={{backgroundColor : "#cca", padding : 25,paddingBottom : 200}}>
      <BarChart width={800} height={500} data={this.state.statistique}>
    
   
    <XAxis dataKey="name" />
    <YAxis dataKey="revenu" />
    <Tooltip />
        <Legend />
    <Bar dataKey="revenu" fill="#8884d8" />
  </BarChart>
        
      </div>
    );
  }
}
const mapActionToProps = dispatch => {
  return {
    getAllVoitureStatistique: () => dispatch(getAllVoitureStatistique())
  };
};
const mapStateToProps = state => {
  return {
    voitureStatistique: state.voiture.allStatistique
  };
};
export default connect(mapStateToProps, mapActionToProps)(Statistique);
