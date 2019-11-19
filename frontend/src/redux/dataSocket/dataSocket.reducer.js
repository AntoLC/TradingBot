import dataSocketActionTypes from './dataSocket.type';
import { cleaningDataSymbol } from './dataSocket.utils';
import dataSocketConf from './dataSocket.conf';
import * as cloneDeep from 'lodash/cloneDeep';
const INITIAL_STATE = {
	data_chart:{},
	is_socket_ready: false
}

const obInterval= {};
dataSocketConf.LIST_INTERVAL.forEach(elementInterval => {
	obInterval[elementInterval] = {
		close: [],
		formattedTime: []
	};
});
dataSocketConf.LIST_SYMBOL.forEach(elementSymbol => {
	INITIAL_STATE.data_chart[elementSymbol] = cloneDeep(obInterval);
});

const dataSocketReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case dataSocketActionTypes.SET_DATA_SYMBOL_CHART:
			return {
				...state,
				data_chart: cleaningDataSymbol(state.data_chart, action.response_socket, action.resetChart),
			}
		case dataSocketActionTypes.SOCKET_STATE_READY:
			return {
				...state,
				is_socket_ready: true,
			}
		default:
			return state;
	}
}

export default dataSocketReducer;