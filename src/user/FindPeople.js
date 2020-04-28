import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import { isAuthenticated } from "../auth";

export class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
      search: "",
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0, 20),
    });
  };

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Now Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <>
      <input
        type="text"
        value={this.state.search}
        onChange={this.updateSearch}
        placeholder="search for users"
      />
      <br/> <br/> <br/>
      <div className="row">
        {users.map((user, i) => (
          <div className="card col-md-4" key={i}>
            <img
              src={`http://localhost:8001/user/photo/${user._id}`}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
              style={{ marginTop: "35px", height: "200px", width: "auto" }}
              className="img-thumbnail"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link to={`/user/${user._id}`}>
                <button
                  style={{
                    backgroundColor: "#00a3f0",
                    borderRadius: "8px",
                    color: "white",
                    width: "120px",
                    height: "38px",
                  }}
                >
                  View Profile{" "}
                </button>
              </Link>
              <button
                onClick={() => this.clickFollow(user, i)}
                style={{
                  backgroundColor: "#00a3f0",
                  borderRadius: "8px",
                  color: "white",
                  width: "120px",
                  height: "38px",
                  marginLeft: "70px",
                }}
              >
                Follow{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  render() {
    const { users, search } = this.state;
    let people = users.filter((user) => {
      return user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Find People </h2>
        {this.state.open && (
          <div className="alert alert-success">
            <p>{this.state.followMessage}</p>
          </div>
        )}

        {this.renderUsers(people)}
      </div>
    );
  }
}

export default FindPeople;
