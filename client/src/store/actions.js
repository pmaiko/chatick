import auth  from './Auth/actions';
import socket  from './Socket/actions';

export default {
    ...auth,
    ...socket,
}
