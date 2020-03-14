import React, { Component } from 'react';
import {isAuthenticated} from "../auth";
import { Redirect, Link } from 'react-router-dom';
import {read} from "./apiUser";

class Profile extends Component {
    constructor(){
        super()
        this.state={
            user:"",
            redirectToSignin:false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data=> {
            if(data.error) {
                console.log("Error")
            } else {
                this.setState({user: data});
            }
        });
    }

    componentDidMount(){
        const userId =this.props.match.params.userId;
        this.init(userId);
           }

    render() {
        const redirectToSignin=this.state.redirectToSignin;
        if(redirectToSignin)
        return <Redirect to="/signin"/>
        
        return (
            <div className="container">
               
                    
                        <h1 className = "mt-5 mb-10" align="center"> {isAuthenticated().user.name} </h1>
                        <h5  align="center"> {isAuthenticated().user.email} </h5>
                        <h5  align="center"> {`${new Date(this.state.user.created).toDateString()}`} </h5>
                </div>
               

           
        )
    }
}

export default Profile;
