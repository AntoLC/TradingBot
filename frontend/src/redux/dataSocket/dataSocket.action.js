import dataSocketActionTypes from './dataSocket.type';

export const connectionSocket = () => ({
    type: dataSocketActionTypes.CONNECTION_SOCKET
});

export const setDataSocket = (data) => ({
    type: dataSocketActionTypes.SET_DATA_SOCKET,
    response_socket: data.msg
});