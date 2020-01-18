import React from 'react';
import {Router, Route, Switch, Redirect} from "react-router";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ChatWrapper from '../pages/ChatWrapper';

import { createBrowserHistory } from "history";
const history = createBrowserHistory();


export default function() {
    let loggedIn = false;
    let path = history.location.pathname;
    return (
        <Router history={history}>
            <Switch>
                <Route path="/chatWrapper" component={ChatWrapper}/>
                <Route path="/registration" component={SignUp}/>
                <Route path="/" component={SignIn}/>
            </Switch>

            { loggedIn ? <Redirect to="/chatWrapper" />: path !== "/registration" ? <Redirect to="/" />: '' }
        </Router>
    )
}
