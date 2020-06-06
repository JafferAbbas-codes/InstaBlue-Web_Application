import React, { Component } from "react";
import { resetPassword } from "../auth";
import Pic4 from "../images/carousel_3.jpg";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      message: "",
      error: "",
    };
  }

  resetPassword = (e) => {
    e.preventDefault();
    this.setState({ message: "", error: "" });

    resetPassword({
      newPassword: this.state.newPassword,
      resetPasswordLink: this.props.match.params.resetPasswordToken,
    }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ message: data.message, newPassword: "" });
      }
    });
  };

  render() {
    return (
      <div 
      style={{backgroundImage:"url(" + Pic4 + ")",
      backgroundPosition:"center",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      height:"100vh"}}>
      <div className="container">
        <br/> <br/>
        <h2 className="mb-5">Reset your Password</h2>

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
          <form>
            <div className="form-group">
              <label> New Password </label>
              <br /> <br />
              <input
                onChange={(e) =>
                  this.setState({
                    newPassword: e.target.value,
                    message: "",
                    error: "",
                  })
                }
                type="password"
                className="form-control"
                value={this.state.newPassword}
                name="newPassword"
                placeholder="your new password"
                autoFocus
              />
            </div>
            <div>
              <br />
              <button
                onClick={this.resetPassword}
                style={{
                  backgroundColor: "#00a3f0",
                  borderRadius: "8px",
                  color: "white",
                  width: "200px",
                  height: "38px",
                  marginLeft: "186px",
                }}
              >
                {" "}
                Reset Password{" "}
              </button>
            </div>
            <br /> <br />
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default ResetPassword;
