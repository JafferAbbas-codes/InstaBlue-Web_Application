import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import Logo from "../images/icon.png";

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
    event.preventDefault();   //no relaoding of the page
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
      <h1 className="mt-5 mb-10" align="center">
        {" "}
        Welcome to InstaBlue !{" "}
      </h1>
      <h3 align="center"> Create account </h3>

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
        <button
          onClick={this.clickSubmit}
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px",
            marginLeft: "455px"
          }}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </form>
  );
  
  render() {
    const { name, email, password, open, error } = this.state;
    return (
      <div className="container">
        <div
          className="alert alert-info"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          Your account has been created. Please{" "}
          <Link to="./signin"> Sign in </Link> to continue.
        </div>
        <div className="container">
          <div
            className="row"
            style={{
              marginTop: "18px",
              marginLeft: "-70px",
              border: "1px solid black",
              width: "1200px",
              height: "510px"
            }}
          >
            <div
              className="mt-1"
              style={{
                width: "500px",
                height: "500px"
              }}
            >
              <img
                src={`${Logo}`}
                alt="Google"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
            <div
              className=" mt-1"
              style={{
                paddingLeft: "20px ",
                width: "670px",
                height: "500px"
              }}
            >
              {this.signupForm(name, email, password)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
