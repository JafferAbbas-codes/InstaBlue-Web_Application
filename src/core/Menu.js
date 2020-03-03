import React from "react";
import { Link, withRouter } from "react-router-dom";
import {signout, isAuthenticated} from "../auth";

const isActive = (history, path) => {
    if(history.location.pathname === path)
    return {color:"white"};
    else
    return {color: "black"};
};

const Menu = ({history}) => (
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
        <Link className="nav-link" to="/following" style={isActive(history, "/following")}>
          {" "}
          Following{" "}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/createpost" style={isActive(history, "/createpost")}>
          {" "}
          Create Post{" "}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/userprofile" style={isActive(history, "/userprofile")}>
          {" "}
          {isAuthenticated().user.name}
          {" "}
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link"  style={isActive(history, "/signout")} onClick={() => signout(() => history.push('/'))}>
          {" "}
          Sign Out{" "}
        </a>
      </li>
      </>
      )}
      
      {!isAuthenticated() && (
        <>
        <li className="nav-item">
        <Link className="nav-link" to="/signin"style={isActive(history, "/signin")}>
          {" "}
          Sign In{" "}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>
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
