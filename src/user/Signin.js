import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import LoginGoogle from "./LoginGoogle";
import "./animations.css";
import Pic4 from "../images/carousel_3.jpg";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
      redirectForgotPassword: false,
      redirectGoogle: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    signin(user).then((data) => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        authenticate(data, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  signinForm = (email, password) => (
    <form>
      <h3 className="mb-10" align="center">
        {" "}
        Sign in{" "}
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
          onChange={this.handleChange("password")} //JSX event attribute
          type="password"
          className="form-control"
          value={password}
          required
        />
      </div>
      <div align="right">
        <br /> 
        <button
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px",
          }}
          onClick={this.clickSubmit}
          className="loginButton ml-2"
        >
          {" "}
          Login{" "}
        </button>
        <Link to="/forgot-password">
          <button
            className="ml-4"
            style={{
              backgroundColor: "#00a3f0",
              borderRadius: "8px",
              color: "white",
              width: "180px",
              height: "38px",
              textAlign: "center",
            }}
          >
            {" "}
            Forgot Password{" "}
          </button>
        </Link>
      </div>
      <br/>
      <div align="center">
        or login with 
        <br />
        <LoginGoogle />
      </div>
    </form>
  );
  render() {
    const {
      email,
      password,
      error,
      redirect,
      redirectForgotPassword,
      redirectGoogle,
    } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (redirectForgotPassword) {
      return <Redirect to="/forgotpassword" />;
    }
    if (redirectGoogle) {
      return <Redirect to="/logingoogle" />;
    }
    return (
      <div
      style={{backgroundImage:"url(" + Pic4 + ")",
      backgroundPosition:"center",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      height:"100vh",
      width:"100vw"}}>
      <div className="container">
        <div
          className="alert alert-info"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.loading ? (
          <div className="jumbotron text-center">
            <h2> Loading.. </h2>
          </div>
        ) : (
          ""
        )}
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
              {this.signinForm(email, password)}
            </div>
            <div className="col-12 col-md-3"></div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Signin;


