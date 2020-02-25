import React, {Component} from 'react'
import {store} from '../store/index';
import avaImg from '../assets/images/ava.png';
import {Link} from "react-router-dom"
import {URL} from "../constants";

class Users extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.props.auth.logged) {
            this.props.socket.on('connect', () => {
                console.log(this.props.socket.id);
            });

            this.props.socket.emit('userConnect', {
                userId: this.props.auth.userId,
                userSocketId: this.props.socket.id,
            });
        }


        this.props.socket.on('userConnect', (data) => {
            let newState = this.state;
            newState.users = data;
            if (this._isMounted) {
                this.setState({
                        ...newState,
                    }
                );
            }
        });

        this.props.socket.on('userConnect', (data) => {
            let newState = this.state;
            newState.users = data;
            if (this._isMounted) {
                this.setState({
                        ...newState,
                    }
                );
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendMessage() {
        this.props.socket.emit('message', {messageInput: this.state.messageInput, userId: this.props.auth.userId});
    }

    handleChange = (e) => {
        let newState = this.state;
        newState.messageInput = e.target.value;
        this.setState({
                ...newState,
            }
        );
    };


    render() {

        let outputUsers = this.state.users.map((el, i) => {
            // console.log(el);
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
}

export default store(Users);

