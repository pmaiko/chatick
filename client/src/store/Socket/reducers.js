import types from '../types';
import api from '../../api/api';
import { Base64 } from 'js-base64';
import axios from 'axios';

const initialState = {
    socketId: '',
};

export function socketReducers(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case types.SOCKET_ID: {
            state.socketId = action.socketId;
            break;
        }
    }

        return state;
}
