import React, { Component } from 'react'
import { store } from '../store/index'
import mixins from '../script'
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
        this.props.socket.emit('message', {
            messageInput: this.state.messageInput,
            userId: this.props.auth.userId,
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
        });
    }

    handleChange = e => {
        let newState = this.state;
        newState.messageInput = e.target.value;
        this.setState({
                ...newState,
            }
        );

        e.target.value = "";
    };


    render() {
        let outputMessage = this.state.messages.map((el, i) => {
            let isMyself = false;
            el.userId === this.props.auth.userId ? isMyself = true : isMyself = false;

            return (
                <div key={i} className={isMyself ? 'messages__item messages__item--my-message' : "messages__item"}>
                    <div className="messages__author">
                        {!isMyself ? el.firstName + ' ' + el.lastName + ':': ''}
                    </div>
                    <div className={'messages__text'} >
                        {el.message}
                    </div>
                </div>
            );
        });

        return (
            <div className="chat">
                <div className="messages">
                    {outputMessage}
                </div>
                <div className="chat__send-area">
                    <textarea className="chat__input-message form-control"
                              onChange={this.handleChange}
                              value={this.state.messageInput}
                              onKeyPress={this.keyPressed}
                    />
                    <button className="chat__send-message btn btn-primary" onClick={()=>{this.sendMessage()}}>Send</button>
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

