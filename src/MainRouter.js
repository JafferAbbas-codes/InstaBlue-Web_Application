import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import ForgotPassword from './user/ForgotPassword';
import LoginGoogle from './user/LoginGoogle';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path= "/" component={Home} />
            <Route exact path= "/signup" component={Signup} />
            <Route exact path= "/signin" component={Signin} />
            <Route exact path= "/forgotpassword" component={ForgotPassword} />
            <Route exact path= "/logingoogle" component={LoginGoogle} />
        </Switch> 
    </div> 
);

export default MainRouter;