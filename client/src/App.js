import React,{useEffect} from 'react';
import {store} from "./store";
import Header from "./components/header";

// import {Router, Route, Switch, Redirect} from "react-router";
// import { createBrowserHistory } from "history";

import {BrowserRouter, Switch, Route} from "react-router-dom"

// import openSocket from 'socket.io-client';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChatWrapper from "./pages/ChatWrapper";

// const history = createBrowserHistory();
// let path = history.location.pathname;

function App(props) {
    useEffect(() => {
        props.checkLogged();
        // const socket = openSocket('http://localhost:5000');
    },[]);


    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/chat" component={ChatWrapper}/>
                <Route path="/registration" component={SignUp}/>
                <Route path="/" component={SignIn}/>
            </Switch>

        </BrowserRouter>
    )
}

export default store(App);
