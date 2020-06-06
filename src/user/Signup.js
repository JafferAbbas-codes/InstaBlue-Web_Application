import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import "./animations.css";
import Pic4 from "../images/carousel_3.jpg";

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault(); //no relaoding of the page
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };

    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
        });
    });
  };

  signupForm = (name, email, password) => (
    <form>
      <h3 className="mb-10" align="center">
        {" "}
        Create account 
      </h3>

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
            margin: "10px 0px 0px 300px",
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
      <div
      style={{backgroundImage:"url(" + Pic4 + ")",
      backgroundPosition:"center",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      height:"100vh"}}>
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
        <div className="row">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3 mt-5">
          <h1 className="wrapper mt-4"
          style={{
            fontSize:"50px"
          }}>
              <span>Welcome</span>
              &nbsp;
              <span>to</span>
              &nbsp;
              <span>InstaBlue</span>
              &nbsp;
              <span>!</span>
            </h1>
          </div>
          <div className="col-12 col-md-3"></div> 
          </div>
          <div className="row">
            <div className="col-12 col-md-3"></div>
            <div
              className="col-12 col-md-6 mt-5"
              style={{
                padding: "30px 30px 30px 30px",
                border: "1px solid black",
                backgroundColor:"white",
                opacity:"0.8",
                borderRadius:"8px"
              }}
            >
              {this.signupForm(name, email, password)}
            </div>
            <div className="col-12 col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
