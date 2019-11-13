import {all, call, takeLatest, put, take} from 'redux-saga/effects';
import {eventChannel, delay} from 'redux-saga';

import dataSocketActionTypes from './dataSocket.type';
import { setDataSocket } from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";


const createSocketChannel = socket => eventChannel((emit) => {
    const handler = (data) => { emit(data); };
    socket.on(dataSocketConf.ROOM, handler);
    return () => {
      socket.off(dataSocketConf.ROOM, handler);
    };
});

export function* connectionSocketSaga(){
    yield console.log("connectionSocket");
    
    try{
        const socket = yield socketIOClient(dataSocketConf.ENDPOINT);
        const socketChannel = yield call(createSocketChannel, socket);
        while (true) {
            const payload = yield take(socketChannel);
            yield put(setDataSocket(payload));
        }
    }catch(error){
        yield console.error("Socket Connection Error: Retry 10 secondes", error);
        yield setTimeout(() => { connectionSocketSaga() }, 10000);
    }
}

export function* onConnectionSocket(){
    yield takeLatest(dataSocketActionTypes.CONNECTION_SOCKET, connectionSocketSaga);
}

export function* dataSocketSagas(){
    yield all([call(onConnectionSocket)]);
}