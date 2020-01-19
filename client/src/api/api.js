import axios from 'axios';
import {API_URL} from '../constants'

export default {
    register (params, callback) {
        axios.post(API_URL + 'register-user', params).then((data) => {
            callback(data);
        })
    },

    login (params, callback) {
        axios.post(API_URL + 'login', params).then((data) => {
            callback(data);
        })
    }
}
