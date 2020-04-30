import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import LoginGoogle from "./LoginGoogle";

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
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    signin(user).then(data => {
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
      <h1 className="mb-10" align="center">
        {" "}
        Sign in{" "}
      </h1>
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
          onChange={this.handleChange("password")}  //JSX event attribute
          type="password"
          className="form-control"
          value={password}
          required
        />
      </div>
      <div>
        <input type="checkbox" />
        <label> Remember me </label>
        <br /> <br />
        <button
          style= {{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px"
          }}
          onClick={this.clickSubmit}   
          className="loginButton"
        >
          {" "}
          Login{" "}
        </button>
        <Link to="/forgot-password">
        <button
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "180px",
            height: "38px",
            marginLeft: "98px",
            textAlign: "center"
          }}
        >
          {" "}
          Forgot Password{" "}
        </button>
        </Link>
      </div>
      <br /> <br />
      <div align="center">
        <LoginGoogle/>
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
      redirectGoogle
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
            <div
              className="mt-4"
              style={{
                padding: "30px ",
                margin: "auto",
                border: "1px solid black",
                width: "450px",
                height: "490px"
              }}
            >
              {this.signinForm(email, password)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
