import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { singlePost, update } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/post_avatar.jpg";

export class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectToProfile: false,
      error: "",
      loading: false,
      fileSize: 0,
    };
  }

  init = (postId) => {
    const token = isAuthenticated().token;
    singlePost(postId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          title: data.title,
          error: "",
          body: data.body,
        });
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData(); 
    const postId = this.props.match.params.postId;
    this.init(postId);
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
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = (event) => {
    
    event.preventDefault();
    this.setState({ loading: true });
    

    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true,
            
          });
        }
      });
    }
  };

  EditPostForm = (title, body) => (
    <form>
      <h2 className="mb-10" align="center">
        {" "}
        Edit Post{" "}
      </h2>
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
            height: "38px",
          }}
        >
          {" "}
          Update{" "}
        </button>
      </div>
    </form>
  );

  render() {
    const { title, body, id, loading, error, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
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
          <div className="row">
            <div className="col-lg-4">
              <img
                src={`http://localhost:8001/post/photo/${id}?${new Date().getTime()}`}
                alt={this.title}
                style={{ marginTop: "35px", height: "200px", width: "auto" }}
                className="img-thumbnail"
                onError={i => (i.target.src = `${DefaultPost}`)}
              ></img>
              <br/> <br/>
              <input
                onChange={this.handleChange("photo")}
                type="file"
                accept="image"
              />
            </div>
            <div className="col-lg-6 mt-4">
              {this.EditPostForm(title,body)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
