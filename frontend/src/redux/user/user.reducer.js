import UserActionTypes from './user.type';

const INITIAL_STATE = {
	user: null
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_NEW_USER:
		return {
			...state,
			user: (!state.user) ? Math.random().toString(36).slice(2) : state.user,
		}
		default:
		return state;
	}
}

export default userReducer;