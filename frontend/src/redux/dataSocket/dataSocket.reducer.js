import dataSocketActionTypes from './dataSocket.type';
import { cleaningDataSocket } from './dataSocket.utils';


const INITIAL_STATE = {
	response_socket:false
}

const dataSocketReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case dataSocketActionTypes.SET_DATA_SOCKET:
		return {
			...state,
			response_socket: cleaningDataSocket(action.response_socket),
		}
		default:
		return state;
	}
}

export default dataSocketReducer;