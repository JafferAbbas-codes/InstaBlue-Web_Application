import React, { Component } from "react";
import { Link } from "react-router-dom";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import DefaultProfile from "../images/user_avatar.png";

export class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0) {
      this.setState({
        error: "Comments should not be empty",
      });
      return false;
    }
    return true;
  };

  addComment = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const postId = this.props.postId;
      const token = isAuthenticated().token;

      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          // passing new comment to parent component
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete this comment? "
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const postId = this.props.postId;
    const token = isAuthenticated().token;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // passing new comment to parent component
        this.props.updateComments(data.comments);
      }
    });
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <h5 className="ml-4" style={{ fontFamily: "cursive" }}>
          {" "}
          Leave a Comment
        </h5>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control ml-4"
              value={this.state.text}
              placeholder="Leave a comment"
            />
            <button
              style={{
                backgroundColor: "#00a3f0",
                borderRadius: "8px",
                color: "white",
                width: "90px",
                height: "38px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
            >
              Post{" "}
            </button>
          </div>
        </form>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <div className="col-md-12 ml-2">
          <h4 className="text-secondary">{comments.length} Comments</h4>
          <hr />
          {comments.map((comment, i) => (
            <div key={i}>
              <div 
              style={{
                  backgroundColor:"#e9e9e9",
                  borderRadius:"10px",
                  paddingTop:"10px",
                  paddingBottom:"1px"
              }}>
                <Link to={`/user/${comment.postedBy._id}`}>
                  <img
                    style={{
                      marginLeft: "10px",
                      borderRadius: "50%",
                      border: "1px Solid black",
                    }}
                    className="float-left mr-1"
                    height="30 px"
                    width="30px"
                    src={`http://localhost:8001/user/photo/${comment.postedBy._id}`}
                    onError={(i) => (i.target.src = `${DefaultProfile}`)}
                    alt={comment.postedBy.name}
                  />
                   {comment.postedBy.name}
                </Link>
                <p></p>
                <p
                  style={{
                    marginLeft:"10px"
                  }}
                >
                  {comment.text}
                </p>
              </div>
              <p className="font-italic mark">
                  
                  {new Date(comment.created).toLocaleTimeString()}
                  {" , "}
                  {new Date(comment.created).toLocaleDateString()}
                  <span>
                    {isAuthenticated().user &&
                      isAuthenticated().user._id === comment.postedBy._id && (
                        <>
                          <span
                            className="float-right mr-1"
                            onClick={() => this.deleteConfirmed(comment)}
                            style={{
                              color: "red",
                              borderRadius: "8px",
                              width: "120px",
                              height: "38px",
                            }}
                          >
                            Remove{" "}
                          </span>{" "}
                        </>
                      )}
                  </span>
                </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
