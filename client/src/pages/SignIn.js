import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../store/index';
import { useHistory } from "react-router";


function SingIn(props) {
    const history = useHistory();
    const [state, setState] = useState({email: '', password: ''});

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const submitForm =  (e) => {
        e.preventDefault();
        props.login(state.email, state.password);

        if (props.auth.logged) {
            history.push("/chatWrapper");
        }

    };


    return (
        <div className="sign-in form">
            <div className="form">
                <div className="form__title">
                    LOGIN
                </div>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                               className="form-control"
                               name="email"
                               id="email"
                               autoComplete="username"
                               placeholder="Enter email"
                               value={state.email}
                               onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               id="password"
                               autoComplete="current-password"
                               placeholder="Password"
                               value={state.password}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form__buttons">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}




export default store(SingIn);
