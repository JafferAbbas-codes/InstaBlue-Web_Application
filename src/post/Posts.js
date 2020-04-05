import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import DefaultPost from "../images/post_avatar.jpg";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = posts => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? post.postedBy._id : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                <Link to={`/user/${posterId}`}>
                  <img
                    style={{ borderRadius: "50%", border: "1px Solid black" }}
                    className="float-left mr-1"
                    height="30 px"
                    width="30px"
                    src={`http://localhost:8001/user/photo/${posterId}`}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={posterName}
                  />
                  <p
                    style={{
                      color: "#00a3f0"
                    }}
                  >
                    <h6>{posterName}</h6>
                  </p>
                </Link>
                <br/>
                <img src={`http://localhost:8001/post/photo/${post._id}`}
                alt={post.title}
                onError={i => (i.target.src = `${DefaultPost}`)}
                className="img-thumbnail mb-3"
                style={{height:"150px", width:"auto"}}>
                </img>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0,50)}</p>
                <Link to={`/posts/${post._id}`}>
                  <button
                    style={{
                      backgroundColor: "#00a3f0",
                      borderRadius: "8px",
                      color: "white",
                      width: "120px",
                      height: "38px"
                    }}
                  >
                    View Post{" "}
                  </button>{" "}
                </Link>
                <p></p>
                <p> {new Date(post.created).toDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Recent Posts </h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
