import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {forgotPassword} from "../auth";

export class ForgotPassword extends Component {
    state = {
      email: "",
      error: "",
      message:"",
      redirect: false
    };


    forgotPassword = event => {
    event.preventDefault();
    this.setState({message:"", error: ""});
    forgotPassword(this.state.email).then(data => {
      if (data.error) 
        this.setState({ error: data.error });
      else {
        this.setState({ message: data.message, redirect:true});
      }
    });
  };


  forgotpasswordForm = email => (
    <form> 
      <div className="form-group">
        <label> Email </label>
        <br/> <br/>
        <input
          onChange={e=> this.setState({
            email:e.target.value,
            message:"",
            error:""
          })}
          type="email"
          className="form-control"
          value={email}
          name="email"
          placeholder="your email address"
          autoFocus
        />
      </div>
      <div>
        <br/>
        <button
          onClick={this.forgotPassword}
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "200px",
            height: "38px",
            marginLeft: "186px"
          }}
        >
          {" "}
          send password reset link{" "}
        </button>
      </div>
      <br /> <br />
    </form>
  );
  render() {
    const { email } = this.state;
    if (this.redirect) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h1 className="mt-4" align="center">
          {" "}
          Password Reset{" "}
        </h1>

        {this.state.message && (
          <h4 className="bg-success">{this.state.message}</h4>
        )}
        {this.state.error && <h4 className="bg-warning">{this.state.error}</h4>}
        <div
          className="mt-5"
          style={{
            padding: "30px ",
            margin: "auto",
            border: "1px solid black",
            width: "450px",
            height: "390px",
            backgroundColor: "#ededed",
          }}
        >
          {this.forgotpasswordForm(email)}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
