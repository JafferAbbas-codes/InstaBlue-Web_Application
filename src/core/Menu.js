import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "white" };
  else return { color: "black" };
};

const Menu = ({ history }) => (
  <div style={{ backgroundColor: "#00a3f0" }}>
    <ul className="nav nav-tabs">
      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>
              {" "}
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/users"
              style={isActive(history, "/users")}
            >
              {" "}
              Users{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/post/create"
              style={isActive(history, "/post/create")}
            >
              {" "}
              Create Post{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/findpeople"
              style={isActive(history, "/findpeople")}
            >
              {" "}
              Find People{" "}
            </Link>
          </li>
          <li className="nav-item">
            {" "}
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              className="nav-link"
            >
              {`${isAuthenticated().user.name}'s Profile`}
            </Link>{" "}
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={isActive(history, "/signout")}
              onClick={() => signout(() => history.push("/"))}
            >
              {" "}
              Sign Out{" "}
            </span>
          </li>
        </>
      )}

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              {" "}
              Sign In{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              {" "}
              Sign Up{" "}
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
