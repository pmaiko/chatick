import { combineReducers } from 'redux';
import { authReducers } from "./Auth/reducers";
import { socketReducers} from "./Socket/reducers";

export default combineReducers({
    auth: authReducers,
    s_socket: socketReducers,
});
