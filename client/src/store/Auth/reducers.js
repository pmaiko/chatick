import types from '../types';
import api from '../../api/api';

const initialState = {
    token: '',
    firstName: '',
    lastName: '',
    email: '',
};

export function authReducers(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type)   {
        case types.ADD_TOKEN: {
            state.email = 'sad';
        }
    }

    return state;
}
