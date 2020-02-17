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
        this._isMounted = true;

        this.props.socket.on('message', (data) => {
            let newState = this.state;
            newState.messages = [...newState.messages, {message: data.messageInput, userId: data.userId}];

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
        let outputMessage = this.state.messages.map((el, i) => {
            let isMyself = false;
            el.userId === this.props.auth.userId ? isMyself = true : isMyself = false;

            return (
                <div key={i} className="massages__item">
                    <div className="messages__author">
                        {!isMyself ? this.props.auth.firstName + ' ' + this.props.auth.lastName + ':': 'I:'}
                    </div>
                    <div className={isMyself ? 'massages__text--right' : 'massages__text'} >
                        {el.message}
                    </div>
                </div>
            );
        });

        return (
            <div className="ChatWrapper">
                <div className="massages">
                    {outputMessage}
                </div>
                <textarea className="message" onChange={this.handleChange} value={this.state.messageInput}/>
                <button className="sendMessage" onClick={()=>{this.sendMessage()}}>sss</button>
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

