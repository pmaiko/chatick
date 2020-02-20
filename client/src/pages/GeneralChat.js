import React, { Component } from 'react'
import { store } from '../store/index';

class GeneralChat extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            messageInput: '',
            messages: [],
        };
    }

    componentDidMount() {
        if(this.props.auth.logged) {
            this._isMounted = true;
            this.props.socket.emit('getGeneralMessage');

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
            });


            this.props.socket.on('getGeneralMessage', (data) => {
                let newState = this.state;
                newState.messages = data;

                if (this._isMounted) {
                    this.setState({
                            ...newState,
                        }
                    );
                }
            });
        }
    }

    componentWillUnmount(prevLogged) {
        this._isMounted = false;

        // if(prevLogged !== this.props.auth.logged) {
        //     this.props.socket.emit('getGeneralMessage');
        // }
    }

    sendMessage() {
        this.props.socket.emit('message', {
            messageInput: this.state.messageInput,
            userId: this.props.auth.userId,
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
        });
    }

    handleChange = (e) => {
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
                    <textarea className="chat__input-message" onChange={this.handleChange} value={this.state.messageInput}/>
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

