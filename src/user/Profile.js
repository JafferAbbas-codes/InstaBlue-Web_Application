import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from "./DeleteUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <img
              src="../user.jpg"
              alt="User logo"
              style={{ marginTop: "40px", height: "20vw", width: "100%" }}
            ></img>
          </div>
          <div className="col-lg-9">
            <div className="lead">
              <h2 className="mt-5 mb-10"> {user.name} </h2>
              <p></p>
              <p> Email: {user.email} </p>
              <p> {`Date Joined: ${new Date(user.created).toDateString()}`} </p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div>
                <Link to="./createpost">
                  <button
                    style={{
                      backgroundColor: "#00a3f0",
                      borderRadius: "8px",
                      color: "white",
                      width: "110px",
                      height: "38px",
                      marginTop: "60px"
                    }}
                  >
                    {" "}
                    Create Post
                  </button>
                </Link>
                <Link to={`/user/edit/${user._id}`}>
                  <button
                    style={{
                      backgroundColor: "#00a3f0",
                      borderRadius: "8px",
                      color: "white",
                      width: "110px",
                      height: "38px",
                      marginLeft: "20px",
                      marginTop: "60px"
                    }}
                  >
                    Edit Profile{" "}
                  </button>
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
