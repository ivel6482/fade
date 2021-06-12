import {
	GET_BARBERSHOPS_REQUEST,
	GET_BARBERSHOPS_SUCCESS,
	GET_BARBERSHOPS_FAIL,
	GET_BARBERSHOP_REQUEST,
	GET_BARBERSHOP_SUCCESS,
	GET_BARBERSHOP_FAIL,
	GET_BARBERSHOP_BARBER_REQUEST,
	GET_BARBERSHOP_BARBER_SUCCESS,
	GET_BARBERSHOP_BARBER_FAIL,
	GET_BARBERS_APPOINTMENTS_REQUEST,
	GET_BARBERS_APPOINTMENTS_SUCCESS,
	GET_BARBERS_APPOINTMENTS_FAIL,
	BOOK_APPOINTMENT_REQUEST,
	BOOK_APPOINTMENT_SUCCESS,
	BOOK_APPOINTMENT_FAIL,
	CANCEL_APPOINTMENT_REQUEST,
	CANCEL_APPOINTMENT_SUCCESS,
	CANCEL_APPOINTMENT_FAIL,
	// GET_USER_BOOKED_APPOINTMENTS_REQUEST,
	// GET_USER_BOOKED_APPOINTMENTS_SUCCESS,
	// GET_USER_BOOKED_APPOINTMENTS_FAIL,
	GET_ACTIVE_USER_APPOINTMENTS_FAIL,
	GET_ACTIVE_USER_APPOINTMENTS_SUCCESS,
	GET_ACTIVE_USER_APPOINTMENTS_REQUEST,
	GET_COMPLETED_USER_APPOINTMENTS_REQUEST,
	GET_COMPLETED_USER_APPOINTMENTS_SUCCESS,
	GET_COMPLETED_USER_APPOINTMENTS_FAIL,
} from '../actions/barbershopsActions'

export function barbershopsReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case GET_BARBERSHOPS_REQUEST:
		case GET_BARBERSHOP_REQUEST:
		case GET_BARBERSHOP_BARBER_REQUEST:
		case GET_BARBERS_APPOINTMENTS_REQUEST:
		case BOOK_APPOINTMENT_REQUEST:
		case CANCEL_APPOINTMENT_REQUEST:
		case GET_ACTIVE_USER_APPOINTMENTS_REQUEST:
		case GET_COMPLETED_USER_APPOINTMENTS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case GET_BARBERSHOPS_SUCCESS:
			return {
				...state,
				barbershops: payload,
				loading: false,
			}

		case GET_BARBERSHOP_BARBER_SUCCESS:
			return {
				...state,
				barbers: payload,
				loading: false,
			}

		case GET_BARBERSHOP_SUCCESS:
			return {
				...state,
				barbershop: payload,
				loading: false,
			}

		case BOOK_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointments: state.appointments.map((appointment) =>
					appointment._id === payload
						? { ...appointment, booked: true }
						: appointment
				),
				loading: false,
			}

		case GET_ACTIVE_USER_APPOINTMENTS_SUCCESS:
			return {
				...state,
				activeUserAppointments: payload,
				loading: false,
			}

		case GET_COMPLETED_USER_APPOINTMENTS_SUCCESS:
			return {
				...state,
				completedUserAppointments: payload,
				loading: false,
			}

		case GET_BARBERSHOPS_FAIL:
			return {
				...state,
				barbershops: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_BARBERSHOP_FAIL:
			return {
				...state,
				barbershop: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_BARBERSHOP_BARBER_FAIL:
			return {
				...state,
				barbers: [],
				appointments: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_BARBERS_APPOINTMENTS_SUCCESS:
			return {
				...state,
				appointments: payload,
				loading: false,
			}

		case CANCEL_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointments: state.appointments.map((appointment) =>
					appointment._id === payload
						? { ...appointment, booked: false }
						: appointment
				),
				activeUserAppointments: state.activeUserAppointments.filter(
					(appointment) => appointment._id !== payload
				),
				loading: false,
			}

		case GET_BARBERS_APPOINTMENTS_FAIL:
			return {
				...state,
				appointments: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		case BOOK_APPOINTMENT_FAIL:
			return {
				...state,
				appointment: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case CANCEL_APPOINTMENT_FAIL:
			return {
				...state,
				appointment: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_ACTIVE_USER_APPOINTMENTS_FAIL:
			return {
				...state,
				activeUserAppointments: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		case GET_COMPLETED_USER_APPOINTMENTS_FAIL:
			return {
				...state,
				completedUserAppointments: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
