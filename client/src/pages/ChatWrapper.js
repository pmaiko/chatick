import React, { useState, useEffect } from 'react'
import { store } from '../store/index'
import GeneralChat from './GeneralChat'
import Users from './Users'
import openSocket from 'socket.io-client'
import { URL } from '../constants'
import { useHistory } from "react-router-dom";
let socket = openSocket(URL);

function ChatWrapper(props) {
    let history = useHistory();
    useEffect(() => {
        if (!props.auth.logged) {
            history.push("/");
        }
        else {
        }
    }, [props.auth.logged]);


    return (
        <div className="ChatWrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Users socket={socket}/>
                    </div>
                    <div className="col-md-6">
                        <GeneralChat socket={socket}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default store(ChatWrapper);

