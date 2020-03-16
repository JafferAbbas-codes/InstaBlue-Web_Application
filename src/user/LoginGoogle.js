import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class LoginGoogle extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false,
        }
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""});
        this.setState({[name]: event.target.value });
    }

    authenticate=(jwt,next) => {
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }
    clickSubmit = event => {
        event.preventDefault();
        const {email,password} = this.state;
        const user = {
            email,
            password
        };
        this.logingoogle(user)
        .then(data => {
            if(data.error) 
            this.setState({error:data.error})
            else{
                this.authenticate(data, () => {
                    this.setState({redirect: true})
                })
            }
            
        });
    };

    
    logingoogle = (user) => {
       return fetch("http://localhost:8001/logingoogle", { 
            method: "POST",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json" 
             },
             body: JSON.stringify(user)
         })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
        };
    
    loginGoogleForm = (email, password) => (
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
                     value={password}/>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label> Remember me </label>
                    <br/> <br/>
                    <button onClick={this.clickSubmit} style={{backgroundColor:"#00a3f0", borderRadius:"8px" , color:"white", width:"110px", height:"38px", marginLeft:"0px"}}> Login </button> 
                </div>
        </form>  
    )
    render() {
        const{email,password} = this.state;
        if(this.redirect){
            return <Redirect to="/" />
        }
        return ( 
            <div className = "container">
              <h3 className = " mb-10" align="center"><img src="../googlelogo.png" alt="Google logo" style={{height: "180px" , width:"350px"}}/> </h3>
              <h5 align="center"> Sign in with your Google Account </h5>
              <div className="alert alert-info" 
                   style ={{display: this.state.error ? "" : "none"}}> 
                        {this.state.error}
              </div>
              {this.loginGoogleForm(email, password)}
              </div>
        );
    }
}

export default LoginGoogle;
