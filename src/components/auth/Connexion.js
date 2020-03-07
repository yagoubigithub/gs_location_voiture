import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

//MUI
import Dialog from '@material-ui/core/Dialog'


//redux
import {connect} from "react-redux";
import {connexion} from '../../store/actions/authAction'
import {getDirename} from '../../store/actions/voitureAction'


import LoadingComponent from "../../utils/loadingComponent";

 class Connexion extends Component {
    state = {
        open : true,

    }
    componentDidMount(){
        this.props.getDirename()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.user !== undefined){
            
            const { history } = this.props;
            if (history) history.push('/voiture');
        }
    }
    handleChange=(e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const  username = this.state.username ? this.state.username : "";
        const password = this.state.password ? this.state.password : "";
        this.props.connexion({ username,password});
    }
    render() {
        return (
            <Dialog fullScreen open={this.state.open}>
            <div className="container-auth">
                <form onSubmit={this.handleSubmit} className="form-auth">
                    <span className="error-auth">{this.props.auth.error}</span>
                    <input className="input-auth" onChange={this.handleChange} name="username" type="text" placeholder="Username" />
                    <input className="input-auth"   onChange={this.handleChange} name="password" type="password" placeholder="Mot de passe" />
                    <input type="submit" className="button-auth" value="Connexion"/>
                    
                </form>  
                <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} /> 
            </div>

               
            </Dialog>
        )
    }
}
const mapActionToProps = dispatch =>{
    return {
        connexion  : (data) => dispatch(connexion(data)),
        getDirename :  () => dispatch(getDirename())
    }
}
const mapStateToProps = state =>{
    return {
        auth : state.auth,
        loading : state.auth.loading
    }
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(Connexion));













