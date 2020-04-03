import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Google from "../images/google.png";
import DefaultProfile from "../images/user_avatar.png";

export class LoginGoogle extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.logingoogle(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.authenticate(data, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  logingoogle = user => {
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
      <h3 align="center">
        <img
          src={`${Google}`}
          alt="Google logo"
          style={{ height: "50%", width: "50%" }}
        />{" "}
      </h3>
      <h5 align="center"> Sign in with your Google Account </h5>
    <br/>
     <div
      style={{
          paddingTop:"10px" ,  
          paddingLeft:"20px" ,
          paddingRight:"20px" ,  
          height:"300px",
            backgroundColor:"#e0e0e0",
          }}>
              <h3 align="center">
        <img
          src={`${DefaultProfile}`}
          alt="Google logo"
          style={{ height: "20%", width: "20%" }}
        />{" "}
      </h3>
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
      <div className="form-group">
        <label className="text-muted"> Password </label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div>
        <input type="checkbox" />
        <label> Remember me </label>
        <button
          onClick={this.clickSubmit}
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px",
            marginLeft:"95px"
          }}
        >
          {" "}
          Login{" "}
        </button>
      </div>
      </div>
    </form>
  );
  render() {
    const { email, password } = this.state;
    if (this.redirect) {
      return <Redirect to="/" />;
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
          className="mt-4"
          style={{
            paddingTop: "20px ",
            paddingRight: "30px",
            paddingLeft: "30px",
            margin: "auto",
            border: "1px solid black",
            width: "450px",
            height: "490px"
          }}
        >
          {this.loginGoogleForm(email, password)}
        </div>
      </div>
    );
  }
}

export default LoginGoogle;
