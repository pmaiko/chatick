import React, { useState } from 'react'
import { useHistory } from "react-router";
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { store } from '../store/index';
//
// class SingUp extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//         };
//
//     };
// }

function SingUp(props) {
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const submitForm = () => {
        api.register(state, (data) => {
            console.log(data)
        })
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });

    };

    return (

        <div className="sign-up">
            {state.firstName}
            {state.lastName}
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>

                    <input type="text"
                           className="form-control"
                           id="firstName"
                           name="firstName"
                           placeholder="First Name"
                           ref={register({ required: true })}
                           onChange={handleChange}
                           value={state.firstName}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                           className="form-control"
                           id="lastName"
                           name="lastName"
                           placeholder="Last Name"
                           onChange={handleChange}
                           value={state.lastName}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>

                    <input type="email"
                           className="form-control"
                           id="email"
                           name="email"
                           autoComplete="username"
                           placeholder="Enter email"
                           onChange={handleChange}
                           value={state.email}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           name="password"
                           placeholder="Password"
                           autoComplete="current-password"
                           onChange={handleChange}
                           value={state.password}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registration</button>
                <button
                    onClick={() => {history.push("/");}}
                    className="btn btn-light">Cancel</button>
            </form>
        </div>
    );
}

export default store(SingUp);

