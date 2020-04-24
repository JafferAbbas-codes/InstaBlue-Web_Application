import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import DefaultPost from "../images/post_avatar.jpg";
import { isAuthenticated } from "../auth";
import Red from "../images/red.png";
import Green from "../images/green.png";

class SinglePost extends Component {
  state = {
    post: "",
    RedirectToHome: false,
    like: false,
    likes: 0,
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    singlePost(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
        });
      }
    });
  };

  checkLike = (likes) => {
    const userId = isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ RedirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post? ");
    if (answer) {
      this.deletePost();
    }
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;
    const postId = this.state.post._id;
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  renderPost = (post) => {
    const posterId = post.postedBy ? post.postedBy._id : "";
    const posterName = post.postedBy ? post.postedBy.name : "Unknown";
    const { like, likes } = this.state;
    return (
      <div className="card-body">
        <Link to={`/user/${posterId}`}>
          <img
            style={{ borderRadius: "50%", border: "1px Solid black" }}
            className="float-left mr-1"
            height="30 px"
            width="30px"
            src={`http://localhost:8001/user/photo/${posterId}`}
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
            alt={posterName}
          />
          <p
            style={{
              color: "#00a3f0",
            }}
          >
            <h6>{posterName}</h6>
          </p>
        </Link>
        <hr />
        <img
          src={`http://localhost:8001/post/photo/${post._id}`}
          alt={post.title}
          onError={(i) => (i.target.src = `${DefaultPost}`)}
          className="img-thumbnail mb-3"
          style={{ height: "200px", width: "auto" }}
        ></img>
        {like ? (
          <h4 onClick={this.likeToggle}>
          <img
          src={`${Red}`} 
          alt="red"
          style={{ height:"30px", width:"30px", borderRadius:"50%"}}/>
          {""} {likes} Like </h4>
        ) : (
          <h4 onClick={this.likeToggle}>
          <img
          src={`${Green}`} 
          alt="green"
          style={{ height:"30px", width:"30px", borderRadius:"50%"}}/>
          {""} {likes} Like </h4>
        )}
        <br />
        <p className="card-text">{post.body}</p>
        <Link to={`/`}>
          <button
            style={{
              backgroundColor: "#00a3f0",
              borderRadius: "8px",
              color: "white",
              width: "120px",
              height: "38px",
            }}
          >
            Back to Home{" "}
          </button>{" "}
        </Link>
        {isAuthenticated().user &&
          isAuthenticated().user._id === post.postedBy._id && (
            <>
              <Link to={`/post/edit/${post._id}`}>
                <button
                  style={{
                    backgroundColor: "#00a3f0",
                    borderRadius: "8px",
                    color: "white",
                    width: "120px",
                    height: "38px",
                  }}
                >
                  Edit Post{" "}
                </button>{" "}
              </Link>
              <button
                onClick={this.deleteConfirmed}
                style={{
                  backgroundColor: "red",
                  borderRadius: "8px",
                  color: "white",
                  width: "120px",
                  height: "38px",
                }}
              >
                Delete Post{" "}
              </button>{" "}
            </>
          )}
        <p></p>
        <p className="font-italic mark">
          {" "}
          {new Date(post.created).toDateString()}
        </p>
      </div>
    );
  };

  render() {
    if (this.state.RedirectToHome) {
      return <Redirect to={`/`} />;
    }
    const { post } = this.state;
    return (
      <div className="container">
        <div
          className="col-md-12 mt-4"
          style={{
            paddingTop: "2px ",
            paddingLeft: "10px",
            border: "1px solid black",
          }}
        >
          {!post ? (
            <div className="jumbotron text-center">
              <h2> Loading.. </h2>
            </div>
          ) : (
            this.renderPost(post)
          )}
        </div>
      </div>
    );
  }
}

export default SinglePost;
