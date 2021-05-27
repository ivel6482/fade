import {
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	LOGOUT_USER_FAIL,
	LOGOUT_USER_SUCCESS,
	SIGNUP_USER,
	SIGNUP_USER_FAIL,
	SIGNUP_USER_SUCCESS,
	GET_LOGGED_IN_USER,
	GET_LOGGED_IN_USER_FAIL,
	GET_LOGGED_IN_USER_SUCCESS,
} from '../actions/userActions'

export function userReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case LOGIN_USER:
		case SIGNUP_USER:
		case LOGOUT_USER:
		case GET_LOGGED_IN_USER:
			return {
				...state,
				loading: true,
			}

		case LOGIN_USER_SUCCESS:
		case SIGNUP_USER_SUCCESS:
			localStorage.setItem('user', JSON.stringify(payload.user))
			localStorage.setItem('isAuthenticated', JSON.stringify(true))
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				loading: false,
			}

		case GET_LOGGED_IN_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				loading: false,
			}

		case LOGIN_USER_FAIL:
		case LOGOUT_USER_FAIL:
		case SIGNUP_USER_FAIL:
		case LOGOUT_USER_SUCCESS:
		case GET_LOGGED_IN_USER_FAIL:
			localStorage.removeItem('user')
			return {
				user: null,
				isAuthenticated: false,
				errors: [...state.errors, payload],
				loading: false,
			}
		default:
			return state
	}
}
