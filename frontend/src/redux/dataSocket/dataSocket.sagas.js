import {all, call, takeLatest, put, take} from 'redux-saga/effects';
import {eventChannel, delay} from 'redux-saga';

import dataSocketActionTypes from './dataSocket.type';
import { setDataSocket } from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";

const socket = socketIOClient(dataSocketConf.ENDPOINT);

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

export function* changeSymbolSaga({symbol}){
    yield console.log("changeSymbolSaga", symbol);
    
    yield socket.emit('set_symbol', symbol, function (success) {
        console.log("Socket -> set_symbol success", success);
    });
}

export function* onConnectionSocket(){
    yield takeLatest(dataSocketActionTypes.CONNECTION_SOCKET, connectionSocketSaga);
}

export function* onChangeSymbol(){
    yield takeLatest(dataSocketActionTypes.CHANGE_SYMBOL, changeSymbolSaga);
}

export function* dataSocketSagas(){
    yield all([call(onConnectionSocket), call(onChangeSymbol)]);
}