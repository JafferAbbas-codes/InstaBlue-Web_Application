import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import ForgotPassword from './user/ForgotPassword';
import LoginGoogle from './user/LoginGoogle';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import NewPost from "./post/NewPost";


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path= "/" component={Home} />
            <Route exact path= "/users" component={Users} />
            <Route exact path= "/signup" component={Signup} />
            <Route exact path= "/signin" component={Signin} />
            <Route exact path= "/forgotpassword" component={ForgotPassword} />
            <Route exact path= "/logingoogle" component={LoginGoogle} />
            <Route exact path= "/user/:userId" component={Profile} />
            <Route exact path= "/user/edit/:userId" component={EditProfile} />
            <Route exact path= "/findpeople" component={FindPeople} />
            <Route exact path= "/post/create" component={NewPost} />
        </Switch> 
    </div> 
);

export default MainRouter;