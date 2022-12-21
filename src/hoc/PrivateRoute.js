import React, { Component } from 'react'
import { Route, Navigate } from 'react-router-dom';

export default class PrivateRoute extends Component {
    adminOrUser = (props) => {
        let returnvar;
        if(sessionStorage.getItem("username")){
            if(sessionStorage.getItem("role") === "admin"){
                returnvar = <this.props.admin {...props}/>
            }else{
                returnvar = <this.props.manager {...props} />
            }
        }else{
            returnvar = <Navigate to="/sign-in" /> 
        }
        return (
            returnvar
        )
    }

    render() {
        return (
            <Route path={this.props.path} render={(props) => this.adminOrUser(props)}/>
        )
    }
}
