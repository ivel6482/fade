import {
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	GET_APPOINTMENTS_REQUEST,
	GET_APPOINTMENTS_SUCCESS,
	GET_APPOINTMENTS_FAIL,
} from '../actions/adminActions'

export default function adminReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case GET_USERS_REQUEST:
		case GET_USER_REQUEST:
		case GET_APPOINTMENTS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case GET_USERS_SUCCESS:
			return {
				...state,
				usersCount: payload.count,
				users: payload.users,
				loading: false,
			}

		case GET_USER_SUCCESS:
			return {
				...state,
				user: payload,
				loading: false,
			}

		case GET_APPOINTMENTS_SUCCESS:
			return {
				...state,
				appointmentsCount: payload.count,
				appointments: payload.appointments,
				loading: false,
			}

		case GET_USERS_FAIL:
			return {
				...state,
				usersCount: 0,
				users: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_USER_FAIL:
			return {
				...state,
				user: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_APPOINTMENTS_FAIL:
			return {
				...state,
				appointmentsCount: 0,
				appointments: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
