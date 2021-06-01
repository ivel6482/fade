import {
	GET_BARBERSHOPS_REQUEST,
	GET_BARBERSHOPS_SUCCESS,
	GET_BARBERSHOPS_FAIL,
	GET_BARBERSHOP_REQUEST,
	GET_BARBERSHOP_SUCCESS,
	GET_BARBERSHOP_FAIL,
} from '../actions/barbershopsActions'

export function barbershopsReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case GET_BARBERSHOPS_REQUEST:
		case GET_BARBERSHOP_REQUEST:
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

		case GET_BARBERSHOP_SUCCESS:
			return {
				...state,
				barbershop: payload,
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

		default:
			return state
	}
}
