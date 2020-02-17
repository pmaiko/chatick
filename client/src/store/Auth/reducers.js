import types from '../types';
import api from '../../api/api';
import { Base64 } from 'js-base64';
import axios from 'axios';

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
