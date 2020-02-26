import types from '../types'

export default  {
    writeSocketId(socketId) {
        return {
            type: types.SOCKET_ID,
            socketId: socketId,
        }
    }
}
