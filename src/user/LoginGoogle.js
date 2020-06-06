import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import {socialLogin, authenticate} from "../auth";
import google from "../images/google.png";

export class LoginGoogle extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  responseGoogle = (response) => {
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
        password: googleId,
        name: name,
        email: email,
        imageUrl: imageUrl
    };
    socialLogin(user).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            authenticate(data, () => {
                this.setState({ redirect: true });
            });
        }
    });
};

render() {
  const { redirect } = this.state;
  if (redirect) {
      return <Redirect to="/" />;
  }

  return (
      <GoogleLogin
          clientId="77301545688-70q4r088bdvd1780f002ldm0rs6j40ec.apps.googleusercontent.com"
          render = {(renderProps) => (
              <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                  backgroundColor:"white",
                  borderRadius:"8px",
                  color:"black",
                  width:"100px",
                  height:"38px"
              }}>
                <img
                src={google}
                alt=""
                style={{ height:"25px", width:"70px"}}
                />
              </button>
          )}
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
      />
  );
}
}

export default LoginGoogle;
