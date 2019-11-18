import dataSocketActionTypes from './dataSocket.type';

export const connectionSocket = () => ({
    type: dataSocketActionTypes.CONNECTION_SOCKET
});
export const setDataSymbolChart = (data, resetChart) => ({
    type: dataSocketActionTypes.SET_DATA_SYMBOL_CHART,
    response_socket: data.msg,
    resetChart: resetChart
});
export const initChart = (symbol, interval) => ({
    type: dataSocketActionTypes.INIT_CHART,
    symbol: symbol,
    interval: interval
});
export const setSocketReady = () => ({
    type: dataSocketActionTypes.SOCKET_STATE_READY,
});