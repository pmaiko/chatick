import types from '../types'
import api from "../../api/api";
import {Base64} from "js-base64";
import axios from "axios/index";


const decodeToken = (data = window.localStorage.getItem('token')) => {
    let state = {};
    if (data) {
        let token = data;

        state.token = token;
        token = token.replace("Bearer ", "");
        token = token.split('.');

        let header = token[0];
        let payload = token[1];
        let signature = token[2];
        payload = JSON.parse(Base64.decode(payload));

        state.userId = payload.userId;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.email = payload.email;

        axios.defaults.headers.common['Authorization'] = data;
        state.logged = true;
        localStorage.setItem('token', data);
    }
    return state;

};

export default  {
    login(email, password) {
        return dispatch => {
            const params = {
                email: email,
                password: password,
            };
            api.login(params, (data) => {
                const state = decodeToken(data.data);
                dispatch(this.loginRequest({
                    type: types.LOGIN,
                    ...state,
                }));
            });
        }

    },

    loginRequest(json) {
        return json;
    },

    checkLogged() {
        const state = decodeToken();
        return {
            type: types.CHECK_LOGGED,
            ...state
        }
    },

    logout() {
        return {
            type: types.LOGOUT,
        }
    }
}
