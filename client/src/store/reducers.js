import { combineReducers } from 'redux';
import { authReducers } from "./Auth/reducers";

export default combineReducers({
    auth: authReducers,
});
