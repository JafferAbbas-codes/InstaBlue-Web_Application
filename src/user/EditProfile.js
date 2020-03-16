import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";
import { Redirect } from "react-router-dom";
import { update } from "./apiUser";


export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      phone: "",
      DOB: "",
      gender: "",
      redirectToProfile: false,
      error:""
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
      const {name} = this.state;
        if(name.length===0){
            this.setState({error:"Name is required"})
            return false
        }
        return true;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    if(this.isValid()){
        const { name, password, phone, DOB, gender } = this.state;
    const user = {
      name,
      password: password || undefined ,
      phone: phone || undefined,
      DOB: DOB || undefined,
      gender: gender || undefined
    };
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;

    update(userId, token, user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          redirectToProfile: true
        });
    });
    }
  };

  signupForm = (name, password, phone, DOB, gender) => (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <img
              src="../user.jpg"
              alt="User logo"
              style={{ marginTop: "40px", height: "20vw", width: "100%" }}
            ></img>
            <br />
            <button style={{ color: "#00a3f0" }}> Choose file </button>
          </div>
          <div className="col-lg-6">
            <br />
            <h2 alignContent="center">Edit Profile</h2>
            <div className="form-group">
              <br />
              <label className="text-muted"> Name </label>
              <input
                onChange={this.handleChange("name")}
                type="text"
                className="form-control"
                value={name}
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
            <div className="form-group">
              <label className="text-muted"> Phone Number </label>
              <input
                onChange={this.handleChange("phone")}
                type="number"
                className="form-control"
                value={phone}
              />
            </div>
            <div className="form-group">
              <label className="text-muted"> Date of Birth </label>
              <input
                onChange={this.handleChange("DOB")}
                type="date"
                className="form-control"
                value={DOB}
              />
            </div>
            <div className="form-group">
              <label className="text-muted"> Gender </label>
              <input
                onChange={this.handleChange("gender")}
                type="text"
                className="form-control"
                value={gender}
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
                  marginLeft: "418px"
                }}
              >
                {" "}
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  render() {
    const {
      id,
      name,
      password,
      phone,
      DOB,
      gender,
      redirectToProfile,error
    } = this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`}></Redirect>;
    }
             
    return <div>
         <div className="alert alert-danger" 
                   style ={{display: error ? "" : "none"}}> 
                        {error}
              </div>
              {this.signupForm(name, password, phone, DOB, gender)}</div>;
  }
}

export default EditProfile;
