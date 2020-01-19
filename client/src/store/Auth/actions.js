import types from '../types'
import api from "../../api/api";
import {Base64} from "js-base64";
import axios from "axios/index";

export default  {
    login(email, password) {
        const state = {};
        const params = {
            email: email,
            password: password,
        };

        api.login(params, (data) => {

            let token = data.data;
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

            axios.defaults.headers.common['Authorization'] = token;
            state.logged = true;
            localStorage.setItem('token', data.data);

            return {
                type: types.LOGIN,
                ...state,
                params: {
                    email: email,
                    password: password,
                }
            }
        });

    },

    checkLogged() {
        return {
            type: types.CHECK_LOGGED,
        }
    },

    logout() {
        return {
            type: types.LOGOUT,
        }
    }
}
