import React from 'react';
import {Router, Route, Switch, Redirect} from "react-router";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ChatWrapper from '../pages/ChatWrapper';
import { store } from '../store'

import { createBrowserHistory } from "history";
const history = createBrowserHistory();


export default store(function(props) {
    let path = history.location.pathname;
    return (
        <Router history={history}>
            <Switch>
                <Route path="/chatWrapper" component={ChatWrapper}/>
                <Route path="/registration" component={SignUp}/>
                <Route path="/" component={SignIn}/>
            </Switch>

            { props.auth.logged ? <Redirect to="/chatWrapper" />: path !== "/registration" ? <Redirect to="/" />: '' }
        </Router>
    )
})
