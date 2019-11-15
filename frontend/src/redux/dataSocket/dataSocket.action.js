import dataSocketActionTypes from './dataSocket.type';

export const connectionSocket = () => ({
    type: dataSocketActionTypes.CONNECTION_SOCKET
});

export const setNewDataSymbolChartTop = (data) => ({
    type: dataSocketActionTypes.SET_NEW_DATA_SYMBOL_CHART_TOP,
    response_socket: data.msg
});
export const setDataSymbolChartTop = (data) => ({
    type: dataSocketActionTypes.SET_DATA_SYMBOL_CHART_TOP,
    response_socket: data.msg
});
export const changeSymbolChartTop = (symbol) => ({
    type: dataSocketActionTypes.CHANGE_SYMBOL_CHART_TOP,
    symbol: symbol
});