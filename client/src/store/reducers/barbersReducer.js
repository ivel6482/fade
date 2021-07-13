import {
	POST_APPOINTMENT_REQUEST,
	POST_APPOINTMENT_SUCCESS,
	POST_APPOINTMENT_FAIL,
	GET_USER_AVAILABLE_APPOINTMENTS_REQUEST,
	GET_USER_AVAILABLE_APPOINTMENTS_SUCCESS,
	GET_USER_AVAILABLE_APPOINTMENTS_FAIL,
	GET_USER_BOOKED_APPOINTMENTS_REQUEST,
	GET_USER_BOOKED_APPOINTMENTS_SUCCESS,
	GET_USER_BOOKED_APPOINTMENTS_FAIL,
	GET_USER_COMPLETED_APPOINTMENTS_REQUEST,
	GET_USER_COMPLETED_APPOINTMENTS_SUCCESS,
	GET_USER_COMPLETED_APPOINTMENTS_FAIL,
} from '../actions/barberActions'

export default function barbersReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case POST_APPOINTMENT_REQUEST:
		case GET_USER_AVAILABLE_APPOINTMENTS_REQUEST:
		case GET_USER_BOOKED_APPOINTMENTS_REQUEST:
		case GET_USER_COMPLETED_APPOINTMENTS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case POST_APPOINTMENT_SUCCESS:
			return {
				...state,
				availableAppointments: [...state.availableAppointments, payload],
				loading: false,
			}

		case GET_USER_AVAILABLE_APPOINTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				availableAppointments: payload,
			}

		case POST_APPOINTMENT_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_USER_AVAILABLE_APPOINTMENTS_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
