import types from '../types';
import api from '../../api/api';
import { Base64 } from 'js-base64';
import axios from 'axios';
// import { useHistory } from "react-router";
// const history  = useHistory();

const initialState = {
    logged: false,
    token: undefined,
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
};

export function authReducers(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // const login = (isToken) => {
    //     let token = isToken;
    //     state.token = token;
    //     token = token.replace("Bearer ", "");
    //     token = token.split('.');
    //
    //     let header = token[0];
    //     let payload = token[1];
    //     let signature = token[2];
    //
    //     payload = JSON.parse(Base64.decode(payload));
    //
    //     state.userId = payload.userId;
    //     state.firstName = payload.firstName;
    //     state.lastName = payload.lastName;
    //     state.email = payload.email;
    //
    //     axios.defaults.headers.common['Authorization'] = token;
    //     state.logged = true;
    // };

    switch (action.type) {
        case types.LOGIN: {
            state = {
                ...action
            };

            break;
        }

        case types.CHECK_LOGGED: {
            if(!action.token) {
                state.token = undefined;
                state.logged = false;
            }
            else {
                state = {
                    ...action
                };
            }


            break;
        }

        case types.LOGOUT: {
            window.localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';

            state.token = undefined;
            state.logged = false;

            break;
        }
    }

        return state;
}
