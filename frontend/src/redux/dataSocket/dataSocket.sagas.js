import {all, call, takeLatest, put, take, fork, cancel} from 'redux-saga/effects';
import {eventChannel, delay} from 'redux-saga';

import dataSocketActionTypes from './dataSocket.type';
import { 
    setDataSymbolChartTop, 
    setNewDataSymbolChartTop } 
    from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";

let socket = null;
let channelChartTopIO = null;

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

/*function* handleIO(socket) {
    yield fork(channelNewChartTop, socket);
    yield fork(channelChartTop, socket);
}*/

function* channelNewChartTop(socket) {
    const channelNewChartTop= yield call(subscribeChannel, {
        socket: socket, 
        channel: "toto"
    });
    while (true) {
        const channelNewChartTopPayload = yield take(channelNewChartTop);
        yield put(setNewDataSymbolChartTop(channelNewChartTopPayload));
    }
}

function* channelChartTop({socket, channel}) {
    const channelChartTop = yield call(subscribeChannel, {
        socket: socket, 
        channel: channel
    });
    while (true) {
        const channelChartTopPayload = yield take(channelChartTop);
        yield put(setDataSymbolChartTop(channelChartTopPayload));
    }
}

export function* connectionSocketSaga(){
    yield console.log("connectionSocket");
    
    try{
        yield socket = socketIOClient(dataSocketConf.ENDPOINT);
        //yield fork(handleIO, socket);
        channelChartTopIO = yield fork(channelChartTop, {
            socket: socket, 
            channel: dataSocketConf.ROOM+"=BTCUSDT"
        });
        yield fork(channelNewChartTop, socket);
        
        requestNewSymbol("toto", "BTCUSDT");
    }catch(error){
        yield console.error("Socket Connection Error: Retry 10 secondes", error);
        yield setTimeout(() => { connectionSocketSaga() }, 10000);
    }
}

export function* changeSymbolChartTopSaga({symbol}){
    yield cancel(channelChartTopIO);
    requestNewSymbol("toto", symbol);
    channelChartTopIO = yield fork(channelChartTop, {
        socket: socket, 
        channel: dataSocketConf.ROOM+"="+symbol
    });
}

export function* onConnectionSocket(){
    yield takeLatest(dataSocketActionTypes.CONNECTION_SOCKET, connectionSocketSaga);
}

export function* onChangeSymbolChartTop(){
    yield takeLatest(dataSocketActionTypes.CHANGE_SYMBOL_CHART_TOP, changeSymbolChartTopSaga);
}

export function* dataSocketSagas(){
    yield all([call(onConnectionSocket), call(onChangeSymbolChartTop)]);
}