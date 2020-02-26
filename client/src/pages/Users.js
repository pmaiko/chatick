import React, {Component, useEffect, useState} from 'react'
import {store} from '../store/index';
import avaImg from '../assets/images/ava.png';
import {Link} from "react-router-dom"
import {URL} from "../constants";

function Users(props){
    const [state, setState] = useState({
        users: [],
        usersOnline: [],
        socketId: '',
        socketIdPrev: '',
    });

    useEffect(() =>{
        if (props.auth.logged) {
            console.log(props.s_socket.socketId);
            props.socket.on('userConnect', (data) => {
                let newState = state;
                newState.usersOnline = [...newState.usersOnline, {
                    userId: data.userId,
                    userSocketId: data.userSocketId,
                }];
                newState.users = data.users;
                setState({
                        ...newState,
                    }
                );
            });
        }
    },[props.auth.logged, props.s_socket.socketId]);

    let sendMessage = () => {
        props.socket.emit('message', {messageInput: state.messageInput, userId: props.auth.userId});
    };

    let handleChange = (e) => {
        let newState = state;
        newState.messageInput = e.target.value;
        this.setState({
                ...newState,
            }
        );
    };

    let outputUsers = state.users.map((el, i) => {
        return (
            <Link key={i} to={`/chat/${el._id}/${el.userSocketId}`}>
                <div className="users__item">
                    <div className="users__photo">
                        <img src={avaImg} alt=""/>
                        <div className="user-status user-status--online"/>
                    </div>
                    <div className="users__info">
                        <div className="users__name">
                            {el.firstName} {el.lastName}
                            <span className="users__time">8min</span>
                        </div>
                        <div className="users__last-message">
                            Hey last, can
                        </div>
                    </div>
                </div>
            </Link>

        );
    });

    return (
        <div className="users">
            <div className="users__profile">
                <div className="users__item">
                    <div className="users__photo">
                        <img src={avaImg} alt=""/>
                        <div className="user-status user-status--online"/>
                    </div>
                    <div className="users__info">
                        <div className="users__name">
                            {/*{el.firstName} {el.lastName}*/}Petya Maiko
                        </div>
                        <div className="users__status-text">
                            Status
                        </div>
                    </div>
                    <div className="users__notification">
                        <i className="icofont-notification"/>
                    </div>
                </div>
            </div>
            <div className="users__search">
                <input
                    type="text"
                    className="users__search-input"
                    placeholder="Search"
                />
            </div>
            {outputUsers}
        </div>
    );
}

export default store(Users);

