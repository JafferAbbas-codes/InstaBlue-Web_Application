import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Logo from "../images/icon.png";

//conditional styling
const isActive = (history, path) => {
  if (history.location.pathname === path)
    return { color: "white", fontFamily: "cursive" };
  else return { color: "black", fontFamily: "cursive" };
};

const Menu = ({ history }) => (
  <div style={{ backgroundColor: "#3bb9ff" }}>
    <nav className="navbar navbar-expand-md">
      <li className="navbar-brand">
        <Link className="nav-link" to="/posts" style={{ color: "black" }}>
          <img
            src={`${Logo}`}
            width="50px"
            height="50px"
            alt=""
          />
           {" "}InstaBlue
        </Link>
      </li>
      <ul className="nav">
        {/*Conditonal rendering admin role */}
        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <li className="nav-item">
            <Link
              to={`/admin`}
              style={isActive(history, `/admin`)}
              className="nav-link"
            >
              Admin
            </Link>
          </li>
        )}
        {/*Conditonal rendering */}
        {isAuthenticated() ? (
          <>
          <li className="nav-item">
              <Link
                className="nav-link"
                to="/posts"
                style={isActive(history, "/posts")}
              >
                Recent Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/users"
                style={isActive(history, "/users")}
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/post/create"
                style={isActive(history, "/post/create")}
              >
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/findpeople"
                style={isActive(history, "/findpeople")}
              >
                Find People
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                className="nav-link"
              >
                {`${isAuthenticated().user.name}'s Profile`}
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={isActive(history, "/signout")}
                onClick={() => signout(() => history.push("/"))}
              >
                Sign Out
              </span>
            </li>
          </>
        ) : (
          <>
            
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  </div>
);

export default withRouter(Menu);
