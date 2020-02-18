import React, { Component } from 'react'
import { store } from '../store/index'
import GeneralChat from './GeneralChat'
import Users from './Users'
import openSocket from 'socket.io-client'
import { URL } from '../constants'

class ChatWrapper extends Component {
    socket = openSocket(URL);

    componentDidMount() {
        this.socket.on('connect', () => {
            console.log("client connect");
        });
    }

    render() {
        return (
            <div className="ChatWrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Users socket={this.socket}/>
                        </div>
                        <div className="col-md-6">
                            <GeneralChat socket={this.socket}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default store(ChatWrapper);

