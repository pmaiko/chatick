import React,{useEffect} from 'react';
import {store} from "./store";
import Header from "./components/header";

import {Router, Route, Switch, Redirect} from "react-router";
import { createBrowserHistory } from "history";

// import openSocket from 'socket.io-client';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChatWrapper from "./pages/ChatWrapper";

const history = createBrowserHistory();
let path = history.location.pathname;

function App(props) {
    useEffect(() => {
        props.checkLogged();
        // const socket = openSocket('http://localhost:5000');
    },[]);


    return(
        <Router history={history}>
            <Header />
            <Switch>
                <Route path="/chatWrapper" component={ChatWrapper}/>
                <Route path="/registration" component={SignUp}/>
                <Route path="/" component={SignIn}/>
            </Switch>

            { props.auth.logged ? <Redirect to="/chatWrapper" />: path !== "/registration" ? <Redirect to="/" />: '' }
        </Router>

    )
}

export default store(App);
