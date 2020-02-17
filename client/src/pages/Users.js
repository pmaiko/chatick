import React, { Component } from 'react'
import { store } from '../store/index';

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

        this.props.socket.emit('getUsers');

        this.props.socket.on('getUsers', (data) => {
            let newState = this.state;
            newState.users = data;
            //console.log(newState.users);
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
            console.log(el);
            return (
                <div key={i} className="">
                    {el.firstName} {el.lastName}
                </div>
            );
        });

        return (
            <div className="GeneralChat">
                {outputUsers}
            </div>
        );
    }
}

export default store(Users);

