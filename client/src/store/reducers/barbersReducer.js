import {
	POST_APPOINTMENT_REQUEST,
	POST_APPOINTMENT_SUCCESS,
	POST_APPOINTMENT_FAIL,
} from '../actions/barberActions'

export default function barbersReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case POST_APPOINTMENT_REQUEST:
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

		case POST_APPOINTMENT_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
