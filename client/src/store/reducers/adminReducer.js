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
	GET_BARBERS_REQUEST,
	GET_BARBERS_SUCCESS,
	GET_BARBERS_FAIL,
	CREATE_BARBERSHOP_REQUEST,
	CREATE_BARBERSHOP_SUCCESS,
	CREATE_BARBERSHOP_FAIL,
	UPDATE_BARBERSHOP_REQUEST,
	UPDATE_BARBERSHOP_SUCCESS,
	UPDATE_BARBERSHOP_FAIL,
	DELETE_BARBERSHOP_REQUEST,
	DELETE_BARBERSHOP_SUCCESS,
	DELETE_BARBERSHOP_FAIL,
	DELETE_APPOINTMENT_REQUEST,
	DELETE_APPOINTMENT_SUCCESS,
	DELETE_APPOINTMENT_FAIL,
} from '../actions/adminActions'

export default function adminReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case GET_USERS_REQUEST:
		case GET_USER_REQUEST:
		case GET_APPOINTMENTS_REQUEST:
		case GET_BARBERS_REQUEST:
		case CREATE_BARBERSHOP_REQUEST:
		case UPDATE_BARBERSHOP_REQUEST:
		case DELETE_BARBERSHOP_REQUEST:
		case DELETE_APPOINTMENT_REQUEST:
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

		case GET_BARBERS_SUCCESS:
			return {
				...state,
				barbers: payload.barbers,
				barbersCount: payload.count,
				loading: false,
			}

		case CREATE_BARBERSHOP_SUCCESS:
			return {
				...state,
				barbershop: payload,
				loading: false,
			}

		case UPDATE_BARBERSHOP_SUCCESS:
			return {
				...state,
				barbershop: payload,
				loading: false,
			}

		case DELETE_BARBERSHOP_SUCCESS:
			return {
				...state,
				barbershops: state.barbershops.filter(
					(barbershop) => barbershop._id !== payload
				),
				loading: false,
			}

		case DELETE_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointmentsCount: state.appointmentsCount - 1,
				appointments: state.appointments.filter(
					(appointment) => appointment._id !== payload
				),
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

		case GET_BARBERS_FAIL:
			return {
				...state,
				barbers: [],
				barbersCount: 0,
				loading: false,
				errors: [...state.errors, payload],
			}

		case CREATE_BARBERSHOP_FAIL:
			return {
				...state,
				barbershop: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case UPDATE_BARBERSHOP_FAIL:
			return {
				...state,
				barbershop: null,
				loading: false,
				errors: [...state.errors, payload],
			}

		case DELETE_BARBERSHOP_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		case DELETE_APPOINTMENT_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
