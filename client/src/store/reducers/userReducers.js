import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_FAIL,
	LOGOUT_USER_SUCCESS,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_FAIL,
	SIGNUP_USER_SUCCESS,
	GET_LOGGED_IN_USER_REQUEST,
	GET_LOGGED_IN_USER_FAIL,
	GET_LOGGED_IN_USER_SUCCESS,
} from '../actions/userActions'

export function userReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case LOGIN_USER_REQUEST:
		case SIGNUP_USER_REQUEST:
		case GET_LOGGED_IN_USER_REQUEST:
		case LOGOUT_USER_REQUEST:
			return {
				...state,
				loading: true,
				isAuthenticated: false,
			}

		case LOGIN_USER_SUCCESS:
		case SIGNUP_USER_SUCCESS:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			}

		case GET_LOGGED_IN_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				token: payload.token,
				user: payload.user,
				loading: false,
			}

		case LOGOUT_USER_SUCCESS:
			return {
				...state,
				user: localStorage.getItem('token')
					? localStorage.getItem('token')
					: null,
				token: null,
				isAuthenticated: false,
				loading: false,
			}

		case LOGIN_USER_FAIL:
		case LOGOUT_USER_FAIL:
		case SIGNUP_USER_FAIL:
		case GET_LOGGED_IN_USER_FAIL:
			return {
				user: null,
				token: null,
				isAuthenticated: false,
				errors: [...state.errors, payload],
				loading: false,
			}
		default:
			return state
	}
}
