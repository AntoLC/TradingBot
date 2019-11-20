import {select, all, call, takeLatest, put, take, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import { selectUser } from '../user/user.selector';

import dataSocketActionTypes from './dataSocket.type';
import { 
    setDataSymbolChart, 
    setSocketReady} 
    from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";

let socket = null;
const getSocket = () => {
    try{
        if(!socket)
            socket = socketIOClient(dataSocketConf.ENDPOINT);
    }catch(error){
        console.error("Socket Connection Error: Retry 10 secondes", error);
        setTimeout(() => { getSocket() }, 10000);
    }
    return socket;
};

const subscribeChannel = ({channel}) => eventChannel((emit) => {
    if(process.env.NODE_ENV === "development"){
        console.debug('subscribeChannel',{channel});
    }
    
    const handler = (data) => { emit(data); };
    getSocket().on(channel, handler);
    return () => {
      //socket.off(channel, handler);
    };
});

function* channelChart(channel, resetChart) {
    const callChannelChart = yield call(subscribeChannel, {
        socket: getSocket(), 
        channel: channel
    });
    while (true) {
        const channelChartPayload = yield take(callChannelChart);
        yield put(setDataSymbolChart(channelChartPayload, resetChart));
    }
}

export function* connectionSocketSaga(){
    yield put(setSocketReady());
    
    const user = yield select(selectUser);
    let reset_chart = true;
    yield fork(channelChart, user, reset_chart);
    reset_chart = false;
    yield fork(channelChart, dataSocketConf.ROOM, reset_chart);
}

const requestNewChart = (user, symbol, interval) => {
    const data_to_emit = {
        uid: user,
        arg: {
            symbol: symbol,
            interval: interval,
            type: "CANDLESTICK"
        }
    };
    getSocket().emit(dataSocketConf.REQUEST, data_to_emit);
};

export function* initChartSaga({symbol, interval}){
    const user = yield select(selectUser);
    
    // New Chart
    let room = user;
    requestNewChart(user, symbol, interval);

    // Listener on new currency
    room = symbol+'-'+interval
    socket.emit('subscribe', room);
}

export function* onChangeInitChart(){
    yield takeLatest(dataSocketActionTypes.INIT_CHART, initChartSaga);
}
export function* onConnectionSocket(){
    yield takeLatest(dataSocketActionTypes.CONNECTION_SOCKET, connectionSocketSaga);
}

export function* dataSocketSagas(){
    yield all([call(onConnectionSocket), call(onChangeInitChart)]);
}