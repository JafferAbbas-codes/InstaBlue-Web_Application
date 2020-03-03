import React, { Component } from "react";
import {signup} from "../auth";

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  
  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>
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
          required
        />
      </div>
      <div>
        <input type="checkbox" required />
        <label> I agree with all the terms and services </label>
        <button
          onClick={this.clickSubmit}
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px",
            marginLeft: "718px"
          }}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </form>
  );
  render() {
    const { name, email, password, open } = this.state;
    return (
      <div className="container">
        <h1 className="mt-5 mb-10" align="center">
          {" "}
          Welcome to InstaBlue !{" "}
        </h1>
        <h3 align="center"> Create account </h3>

        <div
          className="alert alert-info"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          Your account has been created. Please Sign in to continue.
        </div>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
