import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import DefaultPost from "../images/post_avatar.jpg";
import Pic4 from "../images/carousel_3.jpg";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  //api calls
  componentDidMount() {  
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data }); 
        console.log(data)
      }
    });
  }

  renderPosts = posts => {
    return (
      <>
      <div className="row">   
        {posts.map((post, i) => { 
          const posterId = post.postedBy ? post.postedBy._id : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";
          const likes = post.postedBy ? post.likes : "0";
          const comments = post.comments;  

          return (
            <div className="card col-md-12 mb-3" key={i}>
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
                    <h5>{posterName} </h5>
                  </p>
                </Link>
                <br/>
                <div style={{textAlign:"center"}}>
                <img 
                src={`http://localhost:8001/post/photo/${post._id}`}
                alt={post.title}
                onError={i => (i.target.src = `${DefaultPost}`)}
                className="img-thumbnail mb-3"
                style={{height:"300px", width:"auto"}}>
                </img>
                </div>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <Link 
                to={`/post/${post._id}`}>
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
                  <p>{likes.length} Likes    ||  {comments.length} Comments</p>
                <p className="bg-light"> {new Date(post.created).toDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
      </>
    );
  };

   //convert React components into DOM elements
  render() {
    const { posts } = this.state;
    return (
      <div
        style={{
          backgroundImage: "url(" + Pic4 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}>
        <div className="container">
          <h2 className="mb-5">
            <br/> <br/>
            {!posts.length ? 'Loading...' : "Recent Posts"} </h2>
          {this.renderPosts(posts)}
        </div>
      </div>
    );
  }
}

export default Posts;
