import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user_avatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers , posts} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <h4
              style={{
                marginLeft: "10px",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Followers
            </h4>
            {followers.map((person, i) => (
              <div key={i}>
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{ marginLeft: "10px" , borderRadius:"50%", border:"1px Solid black"}}
                        className="float-left mr-1"
                        height="30 px"
                        width="30px"
                        src={`http://localhost:8001/user/photo/${person._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={person.name}
                      />
                      <p 
                        style={{
                          color: "#00a3f0",
                          marginLeft: "30px"
                        }}
                      >
                        {person.name}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 mt-5">
            <h4
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Following
            </h4>
            {following.map((person, i) => (
              <div key={i}>
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <Link to={`/user/${person._id}`}>
                      <img
                      style={{ borderRadius:"50%", border:"1px Solid black"}}
                        className="float-left mr-1"
                        height="30 px"
                        width="30px"
                        src={`http://localhost:8001/user/photo/${person._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={person.name}
                      />
                      <p
                        style={{
                          color: "#00a3f0",
                        }}
                      >
                        {person.name}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 mt-5">
          <h4
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Posts
            </h4>
            {posts.map((post, i) => (
              <div key={i}>
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <Link to={`/post/${post._id}`}>
                      <img
                      style={{ borderRadius:"50%", border:"1px Solid black"}}
                        className="float-left mr-1"
                        height="30 px"
                        width="30px"
                        src={`http://localhost:8001/post/photo/${post._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={post.title}
                      />
                      <p
                        style={{
                          color: "#00a3f0",
                        }}
                      >
                        {post.title}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    );
  }
}

export default ProfileTabs;
