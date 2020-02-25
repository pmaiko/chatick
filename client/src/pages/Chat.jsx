import React, { Component } from 'react'
import { store } from '../store/index'
import mixins from '../script'
import avaImg from '../assets/images/ava.png';

class Chat extends Component {
    render() {
        let outputMessage = this.props.messages.map((el, i) => {
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
                               onChange={this.props.handleChange}
                               value={this.props.state.messageInput}
                               onKeyPress={this.props.keyPressed}
                        />
                    </div>

                    <div className="chat__send-message" onClick={()=>{this.props.sendMessage()}}>
                        <i className="icofont-paper-plane" />
                    </div>

                </div>
            </div>
        );
    }
}

export default Chat;

