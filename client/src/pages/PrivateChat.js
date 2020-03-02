import React, { Component } from 'react'
import { store } from '../store/index'
import mixins from '../script'
import Chat from './Chat'
import avaImg from '../assets/images/ava.png';
import { withRouter } from "react-router";

class PrivateChat extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            socketIdPrev: '',
            messageInput: '',
            messages: [],
        };

        // let {userId} = props.useParams();
        // console.log(props.match.params.userId);
        // console.log(props.match.params.socketId);
    }

    componentDidMount() {
        mixins.addSize();
        if(this.props.auth.logged) {
            this._isMounted = true;
                this.props.socket.on('privateMessage', (data) => {
                if (data.userFromId === this.props.auth.userId ||
                    data.userFromId === this.props.match.params.userId) {
                    let newState = this.state;
                    newState.messages = [...newState.messages, {
                        message: data.messageInput,
                        userId: data.userFromId,
                        firstName: data.firstName,
                        lastName: data.lastName,
                    }];

                    if (this._isMounted) {
                        this.setState({
                                ...newState,
                            }
                        );
                    }

                    mixins.scrollMessage();
                }
            });

            if (this.props.socket.id !== this.state.socketIdPrev) {
                this.props.socket.emit('getPrivateMessage', {
                    userFromId: this.props.auth.userId,
                    userToId: this.props.match.params.userId,
                });
            }

            this.props.socket.on('getPrivateMessage', (data) => {
                if (this.props.socket.id !== this.state.socketIdPrev) {
                    let newState = this.state;
                    newState.socketIdPrev = this.props.socket.id;
                    newState.messages = data;

                    if (this._isMounted) {
                        this.setState({
                                ...newState,
                            }
                        );
                    }
                    mixins.scrollMessage();
                }
            });

        }
    }

    componentWillUnmount(prevLogged) {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            let newState = this.state;
            newState.messages = [];
            this.setState({
                    ...newState,
                }
            );

            this.props.socket.emit('getPrivateMessage', {
                userFromId: this.props.auth.userId,
                userToId: this.props.match.params.userId,
            });
        }

    }


    keyPressed = event => {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    };

    sendMessage() {
        if (this.state.messageInput !== "") {
            this.props.socket.emit('privateMessage', {
                messageInput: this.state.messageInput,
                userFromId: this.props.auth.userId,
                userToId: this.props.match.params.userId,
                firstName: this.props.auth.firstName,
                lastName: this.props.auth.lastName,
                socketId: this.props.match.params.socketId,
            });

            let newState = this.state;
            newState.messageInput = "";
            this.setState({
                    ...newState,
                }
            )
        }
    }

    handleChange = e => {
        let newState = this.state;
        newState.messageInput = e.target.value.replace(/\n/g, '');
        this.setState({
                ...newState,
            }
        );
    };


    render() {
        return (
            <Chat
                messages={this.state.messages}
                state={this.state}
                auth={this.props.auth}
                handleChange={this.handleChange}
                keyPressed={this.keyPressed}
                sendMessage={this.sendMessage}
            />

        );

    }
}

export default store(withRouter(PrivateChat));

