import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index";

export const PrivateRoute = ({Component: Component, ...rest }) => (
    <Route
     {...rest}
     render = {props =>
    isAuthenticated() ? (
        <Component {...props} />
    ) :  (
        <Redirect to= {{pathname: "/signin",
                        state: {from: props.location}
                    }}
        />            
    )}
    />
);

