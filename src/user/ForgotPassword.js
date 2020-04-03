import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: "",
      redirect: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };

  clickSubmit = event => {
    event.preventDefault();
    const { email } = this.state;
    const user = {
      email
    };
    this.forgotpassword(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.authenticate(data, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  forgotpassword = user => {
    return fetch("http://localhost:8001/ForgotPassword", {
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

  forgotpasswordForm = email => (
    <form>
         <h1  align="center">
          {" "}
          Password Reset{" "}
        </h1>
        <br/> <br/> 
      <div className="form-group">
        <label className="text-muted"> Email </label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          required
        />
      </div>
      <div>
        <br/>
        <button
          onClick={this.clickSubmit}
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
       
        <div
          className="alert alert-info"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <div
          className="mt-5"
          style={{
            padding: "30px ",
            margin: "auto",
            border: "1px solid black",
            width: "450px",
            height: "390px",
            backgroundColor:"#ededed"
          }}
        >
          {this.forgotpasswordForm(email)}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
