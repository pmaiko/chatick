import React, { Component } from 'react'
import { store } from '../store/index'
import mixins from '../script'
import avaImg from '../assets/images/ava.png';

class GeneralChat extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            socketIdPrev: '',
            messageInput: '',
            messages: [],
        };
        this.props.socket.on('connect', () => {

        });

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
        let outputMessage = this.state.messages.map((el, i) => {
            let isMyself = false;
            el.userId === this.props.auth.userId ? isMyself = true : isMyself = false;

            return (
                <div key={i} className={isMyself ? 'messages__item messages__item--my-message' : "messages__item"}>
                    <div className="messages__photo">
                        <img src={avaImg} alt=""/>
                        <div className="user-status user-status--online"/>
                    </div>
                    <div className="messages__block">
                        <div className="messages__author">
                            {!isMyself ? el.firstName + ' ' + el.lastName + '': el.firstName + ' ' + el.lastName + ''}
                            <span className="messages__time">8min</span>
                        </div>
                        <div className={'messages__text'} >
                            {el.message}
                            <div className="messages__read-message">
                                <i className="icofont-check-alt"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="chat">
                <div className="chat__header">
                    <div className="chat__head-text">
                        @General chat
                    </div>
                    <div className="chat__close">
                        <i className="icofont-close-line"/>
                    </div>
                </div>
                <div className="messages">
                    {outputMessage}
                </div>
                <div className="chat__send-area">
                    <div className="chat__typing">
                        <span>Petya and Valera are typing</span>
                    </div>
                    <div className="chat__textarea-wrap">
                        <div className="chat__expressionless">
                            <i className="icofont-expressionless" />
                        </div>

                        <input type="text"
                               className="chat__input-message"
                               placeholder="Enter your message"
                               onChange={this.handleChange}
                               value={this.state.messageInput}
                               onKeyPress={this.keyPressed}
                        />
                    </div>

                    <div className="chat__send-message" onClick={()=>{this.sendMessage()}}>
                        <i className="icofont-paper-plane" />
                    </div>

                </div>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>ad</div>
    //     );
    // }
}

export default store(GeneralChat);

