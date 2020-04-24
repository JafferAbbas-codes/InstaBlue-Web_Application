import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";
import DefaultPost from "../images/post_avatar.jpg";
import Popup from "reactjs-popup";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts,user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <Popup
              trigger={
                <button className="btn btn-secondary">
                  <h4
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {followers.length}
                    <br />
                    Followers
                  </h4>
                </button>
              }
              position="right center"
              modal
              closeonDocumentClick
            >
              <div className="container">
                <h4 style={{ marginTop: "10px" }}>Followers</h4>
                <a style={{
                  position: "absolute",
                  top: "20px",
                  right: "30px",
                  transition: "all 200ms",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#333"
                }}
                href={`/user/${user._id}`}> x </a>
                <hr />
                {followers.map((person, i) => (
                  <div key={i}>
                    <div className="row">
                      <div className="col-md-4 mt-2">
                        <a href={`/user/${person._id}`} popupClose>
                          <img
                            style={{
                              marginLeft: "10px",
                              borderRadius: "50%",
                              border: "1px Solid black",
                            }}
                            className="float-left mr-1"
                            height="30 px"
                            width="30px"
                            src={`http://localhost:8001/user/photo/${person._id}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            alt={person.name}
                          />
                          <p
                            style={{
                              color: "#00a3f0",
                              marginLeft: "30px",
                            }}
                          >
                            {person.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Popup>
          </div>
          <div className="col-md-4 mt-5">
            <Popup
              trigger={
                <button className="btn btn-secondary">
                  <h4
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {following.length}
                    <br />
                    Following
                  </h4>
                </button>
              }
              position="right center"
              modal
              closeonDocumentClick
            >
              <div className="container">
                <h4 style={{ marginTop: "10px" }}>Followers</h4>
                <a style={{
                  position: "absolute",
                  top: "20px",
                  right: "30px",
                  transition: "all 200ms",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#333"
                }}
                href={`/user/${user._id}`}> x </a>
                <hr />
                {following.map((person, i) => (
                  <div key={i}>
                    <div className="row">
                      <div className="col-md-4 mt-2">
                        <a href={`/user/${person._id}`} popupClose>
                          <img
                            style={{
                              borderRadius: "50%",
                              border: "1px Solid black",
                            }}
                            className="float-left mr-1"
                            height="30 px"
                            width="30px"
                            src={`http://localhost:8001/user/photo/${person._id}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            alt={person.name}
                          />
                          <p
                            style={{
                              color: "#00a3f0",
                            }}
                          >
                            {person.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Popup>
          </div>
          <div className="col-md-4 mt-5">
            <h4
              className="text-secondary"
              style={{
                marginLeft: "40px",
                fontWeight: "bold",
              }}
            >
              {<h9 style={{ marginLeft: "25px" }}>{posts.length} </h9>}
              <br />
              Posts
            </h4>
          </div>
        </div>
        <div>
          <hr />
          <h4
            className="text-black"
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
            }}
           >
            Posts
          </h4>
          <hr/>
          <div className="row">   
        {posts.map((post, i) => { 
          const posterId = post.postedBy ? post.postedBy._id : "";
          const posterName = post.postedBy ? post.postedBy.name : "Unknown";

          return (
            <div className="card col-md-3" 
            style={{
              marginLeft:"70px",
              marginRight:"5px",
              marginBottom:"30px",
            borderRadius:"10px",
          border:"2px solid black",
        opacity:"0.9"}}
            key={i}>
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
                <img 
                src={`http://localhost:8001/post/photo/${post._id}`}
                alt={post.title}
                onError={i => (i.target.src = `${DefaultPost}`)}
                className="img-thumbnail mb-3"
                style={{height:"150px", width:"auto"}}>
                </img>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0,50)}</p>
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
                <p> {new Date(post.created).toDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
