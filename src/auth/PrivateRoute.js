import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

export const PrivateRoute = ({ component: Component, ...rest }) => (  
  // props means variables passed by the parent component.
  <Route
    {...rest}
    render={(props) =>  
      isAuthenticated() ? (
        <Component {...props} />  
      ) : (
        <Redirect
          to= "/signin"
        />
      )
    }
  />
);

export default PrivateRoute;
