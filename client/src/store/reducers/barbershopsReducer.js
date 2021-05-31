import {
	GET_BARBERSHOPS_REQUEST,
	GET_BARBERSHOPS_SUCCESS,
	GET_BARBERSHOPS_FAIL,
} from '../actions/barbershopsActions'

export function barbershopsReducer(state, action) {
	const { type, payload } = action
	switch (type) {
		case GET_BARBERSHOPS_REQUEST:
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

		case GET_BARBERSHOPS_FAIL:
			return {
				...state,
				barbershops: [],
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
