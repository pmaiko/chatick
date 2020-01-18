import React, { Component } from 'react'
import { store } from '../store/index';

class ChatWrapper extends Component {

    render() {
        return (
            <div className="ChatWrapper">
                <div></div>
            </div>
        );
    }
}

export default store(ChatWrapper);

