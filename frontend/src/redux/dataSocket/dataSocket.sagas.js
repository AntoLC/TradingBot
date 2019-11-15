import {all, call, takeLatest, put, take, fork} from 'redux-saga/effects';
import {eventChannel, delay} from 'redux-saga';

import dataSocketActionTypes from './dataSocket.type';
import { 
    setDataSymbolChartTop, 
    setNewDataSymbolChartTop } 
    from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";

let socket = null;

const subscribeChannel = ({socket, channel}) => eventChannel((emit) => {
    console.debug('subscribeChannel',{socket, channel});
    const handler = (data) => { emit(data); };
    socket.on(channel, handler);
    return () => {
      //socket.off(channel, handler);
    };
});

const requestNewSymbol = (user, symbol) => {
    const data_to_emit = {
        uid: user,
        arg: {
            symbol: symbol,
            type: "CANDLESTICK"
        }
    };
    socket.emit(dataSocketConf.REQUEST, data_to_emit);
};

function* handleIO(socket) {
    yield fork(channelUser, socket);
    yield fork(channelGlobal, socket);
}

function* channelUser(socket) {
    const channelUser= yield call(subscribeChannel, {
        socket: socket, 
        channel: "toto"
    });
    while (true) {
        const channelUserPayload = yield take(channelUser);
        yield put(setNewDataSymbolChartTop(channelUserPayload));
    }
}

function* channelGlobal(socket) {
    const channelGlobal = yield call(subscribeChannel, {
        socket: socket, 
        channel: dataSocketConf.ROOM
    });
    while (true) {
        const channelGlobalPayload = yield take(channelGlobal);
        yield put(setDataSymbolChartTop(channelGlobalPayload));
    }
}

export function* connectionSocketSaga(){
    yield console.log("connectionSocket");
    
    try{
        yield socket = socketIOClient(dataSocketConf.ENDPOINT);
        yield fork(handleIO, socket);

        requestNewSymbol("toto", "BTCUSDT");
    }catch(error){
        yield console.error("Socket Connection Error: Retry 10 secondes", error);
        yield setTimeout(() => { connectionSocketSaga() }, 10000);
    }
}

export function* changeSymbolSaga({symbol}){
    requestNewSymbol("toto", symbol);
}

export function* onConnectionSocket(){
    yield takeLatest(dataSocketActionTypes.CONNECTION_SOCKET, connectionSocketSaga);
}

export function* onChangeSymbolChartTop(){
    yield takeLatest(dataSocketActionTypes.CHANGE_SYMBOL_CHART_TOP, changeSymbolSaga);
}

export function* dataSocketSagas(){
    yield all([call(onConnectionSocket), call(onChangeSymbolChartTop)]);
}