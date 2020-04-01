import React, { Component } from 'react'
import {follow, unfollow} from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

    render() {
        return (
            <div className="d-inline-block mt-3">
              {
              !this.props.following ? (
               <button
               onClick={this.followClick}
                style={{
                  backgroundColor: "#00a3f0",
                  borderRadius: "8px",
                  color: "white",
                  width: "100px",
                  height: "38px",
                }}  
              > 
              Follow
              </button>
            
              ) : (
                
                <button
                onClick={this.unfollowClick}
                style={{
                  backgroundColor: "red",
                  borderRadius: "8px",
                  color: "white",
                  width: "100px",
                  height: "38px",
                }} 
              > Unfollow
              </button>
              
              )
              }   
            </div>
        )
    }
}

export default FollowProfileButton;
