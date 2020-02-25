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
        console.log(props.match.params.userId);
    }

    componentDidMount() {
        mixins.addSize();
        if(this.props.auth.logged) {
            this._isMounted = true;

            this.props.socket.on('message', (data) => {
                let newState = this.state;
                newState.messages = [...newState.messages, {
                    message: data.messageInput,
                    userId: data.userId,
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
            });

            if (this.props.socket.id !== this.state.socketIdPrev) {
                this.props.socket.emit('getGeneralMessage');
            }

            this.props.socket.on('getGeneralMessage', (data) => {
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

    keyPressed = event => {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    };

    sendMessage() {
        if (this.state.messageInput !== "") {
            this.props.socket.emit('message', {
                messageInput: this.state.messageInput,
                userId: this.props.auth.userId,
                firstName: this.props.auth.firstName,
                lastName: this.props.auth.lastName,
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
            <div>
                asd1
                {/*<Chat*/}
                {/*messages={this.state.messages}*/}
                {/*state={this.state}*/}
                {/*auth={this.props.auth}*/}
                {/*handleChange={this.handleChange}*/}
                {/*keyPressed={this.keyPressed}*/}
                {/*sendMessage={this.sendMessage}*/}
                {/*/>*/}
            </div>

        );

    }

    // render() {
    //     return (
    //         <div>ad</div>
    //     );
    // }
}

export default store(withRouter(PrivateChat));

