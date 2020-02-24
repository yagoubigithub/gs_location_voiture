import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

//MUI
import Dialog from '@material-ui/core/Dialog'


//redux
import {connect} from "react-redux";
import {connexion} from '../../store/actions/authAction'


import LoadingComponent from "../../utils/loadingComponent";

 class Connexion extends Component {
    state = {
        open : true,

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.user !== undefined){
            
            const { history } = this.props;
            if (history) history.push('/home');
        }
    }
    handleChange=(e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const  username = this.state.username ? this.state.username : "admin";
        const password = this.state.password ? this.state.password : "admin";
        this.props.connexion({ username,password});
    }
    render() {
        return (
            <Dialog fullScreen open={this.state.open}>

                <form onSubmit={this.handleSubmit}>
                    <span>{this.props.auth.error}</span>
                    <input onChange={this.handleChange} name="username" type="text" placeholder="Username" defaultValue="admin"/>
                    <input onChange={this.handleChange} name="password" type="password" placeholder="Mot de passe" defaultValue="admin"/>
                    <input type="submit" />
                    
                </form>  
                <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
            </Dialog>
        )
    }
}
const mapActionToProps = dispatch =>{
    return {
        connexion  : (data) => dispatch(connexion(data))
    }
}
const mapStateToProps = state =>{
    return {
        auth : state.auth,
        loading : state.auth.loading
    }
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(Connexion));













