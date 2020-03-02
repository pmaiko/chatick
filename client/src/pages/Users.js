import React, {Component, useEffect, useState} from 'react'
import {store} from '../store/index';
import avaImg from '../assets/images/ava.png';
import {Link} from "react-router-dom"

const Users = (props) => {
    const [state, setState] = useState({
        users: [],
        usersConnect: [],
        socketId: '',
        socketIdPrev: '',
    });

    // props.socket.on('connect', () => {
    //     console.log(props.socket.id);
    // });

    useEffect(() =>{
        if (props.auth.logged) {
            props.socket.emit('userConnect',{
                userId: props.auth.userId,
            });

            props.socket.on('userConnect', (data) => {
                let newState = state;
                newState.users = [];

                data.users.map((user) => {
                    data.usersConnect.map((userConnect) => {
                        if (user._id === userConnect.userId) {
                            user.socketId = userConnect.socketId;
                        }
                    });

                    newState.users.push(user);
                });

                setState({
                        ...newState,
                    }
                );
            });
        }
    },[props.auth.logged, window]);

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
        if (el._id !== props.auth.userId) {
            return (
                <Link key={i} to={`/chat/${el._id}${el.socketId ? '/' + el.socketId : ''}`}>
                    <div className="users__item">
                        <div className="users__photo">
                            <img src={avaImg} alt=""/>
                            <div
                                className={el.socketId ? 'user-status user-status--online': 'user-status'}
                            />
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
        }
    });

    return (
        <div className="users">
            <div className="users__profile">
                <div className="users__item">
                    <div className="users__photo">
                        <img src={avaImg} alt=""/>
                        {/*<div className="user-status user-status--online"/>*/}
                    </div>
                    <div className="users__info">
                        <div className="users__name">
                            {props.auth.firstName} {props.auth.lastName}
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

