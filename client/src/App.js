import React from 'react';
import {Component} from 'react';
import Routes from './routes/routes'

import openSocket from 'socket.io-client';
import SignIn from "./pages/SignIn";

class App extends  Component{
    constructor(props) {
        super(props);
        const socket = openSocket('http://localhost:5000');
    }

    render() {
        return(
            <Routes />
        )
    }
}

export default App;
