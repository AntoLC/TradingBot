import {select, all, call, takeLatest, put, take, fork, cancel} from 'redux-saga/effects';
import {eventChannel, delay} from 'redux-saga';
import * as cloneDeep from 'lodash/cloneDeep';

import { selectUser } from '../user/user.selector';

import dataSocketActionTypes from './dataSocket.type';
import { 
    setDataSymbolChart, 
    setSocketReady} 
    from './dataSocket.action';
import dataSocketConf from './dataSocket.conf';
import socketIOClient from "socket.io-client";

let channelChartIO = null;
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
    console.debug('subscribeChannel',{channel});
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
    yield console.log("connectionSocket");
    yield put(setSocketReady());
    
    const user = yield select(selectUser);
    let reset_chart;
    yield fork(channelChart, user, reset_chart = true);
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
    yield console.log("initChartSaga");
    const user = yield select(selectUser);
    
    // New Chart
    let room = user;
    requestNewChart(user, symbol, interval);

    // Listener on new currency
    room = dataSocketConf.ROOM+'-'+symbol+'-'+interval
    let reset_chart = false;
    //yield cancel(channelChartIO);
    channelChartIO = yield fork(channelChart, room, reset_chart = false);
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