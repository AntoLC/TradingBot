import ClassActionTypes from './class.type';

const INITIAL_STATE = {
	menu_left: false
}

const classReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ClassActionTypes.TOGGLE_MENU_LEFT:
		return {
			...state,
			menu_left: !state.menu_left,
		}
		default:
		return state;
	}
}

export default classReducer;