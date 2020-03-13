import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {signin, authenticate} from "../auth";

export class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false,
            redirectForgotPassword: false,
            redirectGoogle: false,
            loading: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""});
        this.setState({[name]: event.target.value });
    }

    
    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        const {email,password} = this.state;
        const user = {
            email,
            password
        };
        signin(user)
        .then(data => {
            if(data.error) 
            this.setState({error:data.error, loading: false})
            else{
                this.authenticate(data, () => {
                    this.setState({redirect: true})
                })
            }
            
        });
    };

    clickSubmitForgotPassword = event => {
        event.preventDefault();
        const {email} = this.state;
        const user = {
            email,
        };
        signin(user)
        .then(data => {
            if(data.error) 
            this.setState({error:data.error})
            else{
                this.authenticate(data, () => {
                    this.setState({redirectForgotPassword: true})
                })
            }
            
        });
    };

    clickLoginGoogle = event => {
        event.preventDefault();
        const {email,password} = this.state;
        const user = {
            email,
            password
        };
        signin(user)
        .then(data => {
            if(data.error) 
            this.setState({error:data.error})
            else{
                authenticate(data, () => {
                    this.setState({redirectGoogle: true})
                })
            }
            
        });
    };

        
    signinForm = (email, password) => (
        <form> 
                <div className = "form-group">
                    <label className = "text-muted"> Email </label>   
                    <input onChange={this.handleChange("email")}
                     type="email" 
                     className="form-control"
                     value={email} required/>
                </div>
                <div className = "form-group">
                    <label className = "text-muted"> Password </label>   
                    <input onChange={this.handleChange("password")}
                     type="password" 
                     className="form-control"
                     value={password} required/>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label> Remember me </label>
                    <br/> <br/>
                    <button onClick={this.clickSubmitForgotPassword} style={{backgroundColor:"#00a3f0", borderRadius:"8px" , color:"white", width:"110px", height:"38px", marginLeft:"750px"}}> Login </button> 
                    <button onClick={this.clickSubmit} style={{backgroundColor:"#00a3f0", borderRadius:"8px" , color:"white", width:"200px", height:"38px", marginLeft:"48px"}}> Forgot Password </button>
                </div>
                <br/> <br/>
                <div>
                    <p style={{textAlign:"center"}}> or login with </p>
                    <button onClick={this.clickLoginGoogle} style={{backgroundColor:"#FFFFFF", borderRadius:"8px" , color:"Black", width:"100px", height:"38px", marginLeft:"505px"}}> <img src="../google.png" style={{marginLeft:"-10px",height: "25px" , width:"25px"}}/>oogle </button>
                </div>
        </form>  
    )
    render() {
        const{email,password} = this.state;
        if(this.redirect){
            return <Redirect to="/" />
        }
        if(this.redirectForgotPassword){
            return <Redirect to="/ForgotPassword"/>
        }
        if(this.redirectGoogle){
            return <Redirect to="/LoginGoogle"/>
        }
        return ( 
            <div className = "container">
              <h1 className = "mt-5 mb-10" align="center"> Sign in </h1>
              <div className="alert alert-info" 
                   style ={{display: this.state.error ? "" : "none"}}> 
                        {this.state.error}
              </div>
              {this.loading ? ( <div className="jumbotron text-center">
                  <h2> Loading.. </h2>
              </div> )
              : ("")
              }
              {this.signinForm(email, password)}
              </div>
        );
    }
}

export default Signin;
