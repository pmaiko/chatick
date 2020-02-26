import React, { useState, useEffect } from 'react'
import { store } from '../store/index'
import actions from '../store/actions'
import GeneralChat from './GeneralChat'
import Users from './Users'
import io from 'socket.io-client'
import { URL } from '../constants'
import { useHistory } from "react-router-dom";
import {BrowserRouter, Switch, Route, useParams} from "react-router-dom"
import PrivateChat from './PrivateChat'

function ChatWrapper(props) {
    // socket.on('connect', () => {
    //
    // });

    let history = useHistory();
    const [state, setState] = useState({socket: undefined});
    useEffect(() => {
        if (!props.auth.logged) {
            history.push("/");
        }
        else {
            let newState = state;
            newState.socket = io.connect(URL);
            newState.socket.on('connect', () => {
                props.writeSocketId(newState.socket.id);
            });
            setState({
                ...newState,
            });
        }

    }, [props.auth.logged]);

    if (state.socket !== undefined) {
        return (
            <div className="page-wrapper chat-wrapper">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-md-3 h-100 px-0">
                            <Users socket={state.socket} />
                        </div>
                        <div className="col-md-6 h-100 px-0">
                            <Switch>
                                <Route path={`/chat/:userId`}>
                                    <PrivateChat socket={state.socket} useParams={useParams}/>
                                </Route>
                                <Route path={`/chat`}>
                                    <GeneralChat socket={state.socket}/>
                                </Route>
                            </Switch>
                        </div>

                        <div className="col-md-3 h-100 px-0">
                            <div className="details"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<div>loading</div>)
    }


}

export default store(ChatWrapper);

