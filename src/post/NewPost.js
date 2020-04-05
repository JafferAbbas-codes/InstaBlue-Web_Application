import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      errors: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData(); //profile photo
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "Title and Body is required", loading: false });
      return false;
    }
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 1MB",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
            this.setState({ loading: false, title:"", body:"", photo:"", redirectToProfile:true });
        }
      });
    }
  };

  newPostForm = (title,body) => (
    <form>
        <h2 className="mb-10" align="center"> Create a New Post </h2>
        <h4> Upload Photo </h4>
              <p /> 
              <input
                onChange={this.handleChange("photo")}
                type="file"
                accept="image"
              />
      
      <p />
      <div className="form-group">
        <label className="text-muted"> Title </label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Body </label>
        <textarea
          onChange={this.handleChange("body")}
          className="form-control"
          value={body}
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
            height: "38px"
          }}
        >
          {" "}
          Post{" "}
        </button>
      </div>
    </form>
  );

  render() {
    const {
      title,body,user,loading,error, redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2> Loading.. </h2>
          </div>
        ) : (
          ""
        )}
        <div className="container">
            <div className="col-md-12 mt-3"
            style={{
                padding: "30px ",
                border: "1px solid black"
              }}>
              {this.newPostForm(title,body)}
              </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
