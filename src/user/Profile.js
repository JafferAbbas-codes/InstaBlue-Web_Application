import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "../images/user_avatar.png";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import {listByUser} from "../post/apiPost";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts:[]
    };
  }

  //check follow
  checkFollow = user => {
    const jwt = isAuthenticated();   
    const match = user.followers.find(follower => {
      // one id has many other followers id and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token)
    .then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;  
    this.init(userId);
  }

  componentWillReceiveProps(props) {   
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user , posts} = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const PhotoURL = user._id
      ? `http://localhost:8001/user/photo/${user._id}?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <img
              src={PhotoURL}
              alt={user.name}
              style={{ marginTop: "35px", height: "200px", width: "auto" }}
              className="img-thumbnail"
              onError={i => (i.target.src = `${DefaultProfile}`)}
            ></img>
          </div>
          <div className="col-lg-9">
            <div className="lead">
              <h2 className="mt-5 mb-10"> {user.name} </h2>
              <p></p>
              <p> Email: {user.email} </p>
              <p> {`Date Joined: ${new Date(user.created).toDateString()}`} </p>
            </div>
            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div>
                <Link to="/post/create">
                  <button
                    style={{
                      backgroundColor: "#00a3f0",
                      borderRadius: "8px",
                      color: "white",
                      width: "110px",
                      height: "38px"
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
                      marginLeft: "20px"
                    }}
                  >
                    Edit Profile{" "}
                  </button>
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
          <ProfileTabs 
          followers={user.followers} 
          following={user.following} 
          posts = {posts}
          user={user}/>
        </div>
      </div>
    );
  }
}

export default Profile;
