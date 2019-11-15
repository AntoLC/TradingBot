import dataSocketActionTypes from './dataSocket.type';
import { cleaningDataSymbol } from './dataSocket.utils';


const INITIAL_STATE = {
	data_chart_top:{
		close: [],
		formattedTime: []
	}
}

const dataSocketReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case dataSocketActionTypes.SET_NEW_DATA_SYMBOL_CHART_TOP:
			return {
				...state,
				data_chart_top: cleaningDataSymbol({
					close: [],
					formattedTime: []
				}, action.response_socket),
			}
		case dataSocketActionTypes.SET_DATA_SYMBOL_CHART_TOP:
			return {
				...state,
				data_chart_top: cleaningDataSymbol(state.data_chart_top, action.response_socket),
			}
		default:
			return state;
	}
}

export default dataSocketReducer;