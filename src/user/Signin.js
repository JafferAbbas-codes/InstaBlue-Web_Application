import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import Google from "../images/google.png";

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

  clickSubmitForgotPassword = event => {
    event.preventDefault();
    const { email } = this.state;
    const user = {
      email
    };
    signin(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.authenticate(data, () => {
          this.setState({ redirectForgotPassword: true });
        });
      }
    });
  };

  clickLoginGoogle = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    signin(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else {
        authenticate(data, () => {
          this.setState({ redirectGoogle: true });
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
          onChange={this.handleChange("password")}
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
          onClick={this.clickSubmit}
          style={{
            backgroundColor: "#00a3f0",
            borderRadius: "8px",
            color: "white",
            width: "110px",
            height: "38px"
          }}
        >
          {" "}
          Login{" "}
        </button>
        <button
          onClick={this.clickSubmitForgotPassword}
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
      </div>
      <br /> <br />
      <div>
        <p style={{ textAlign: "center" }}> or login with </p>
        <button
          onClick={this.clickLoginGoogle}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "100px",
            height: "38px",
            marginLeft: "144px"
          }}
        >
          {" "}
          <img
            src={`${Google}`}
            alt="Google"
            style={{
              height: "100%",
              width: "100%",
              marginLeft: "1px",
              marginTop: "1px"
            }}
          />{" "}
        </button>
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
