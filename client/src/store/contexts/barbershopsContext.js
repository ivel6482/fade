import { createContext, useReducer } from 'react'
import axios from 'axios'
import { barbershopsReducer } from '../reducers/barbershopsReducer'
import {
	GET_BARBERSHOPS_REQUEST,
	GET_BARBERSHOPS_SUCCESS,
	GET_BARBERSHOPS_FAIL,
} from '../actions/barbershopsActions'

const initialState = {
	barbershops: [],
	barbershop: null,
	loading: false,
	errors: [],
}

export const BarbershopsContext = createContext()
const { Provider } = BarbershopsContext

export const BarbershopsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(barbershopsReducer, initialState)
	const { barbershops, barbershop, loading, errors } = state

	const getBarbershops = async () => {
		try {
			dispatch({ type: GET_BARBERSHOPS_REQUEST })
			const res = await axios.get('/barbershops')

			dispatch({ type: GET_BARBERSHOPS_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: GET_BARBERSHOPS_FAIL, payload: error })
		}
	}

	return (
		<Provider
			value={{
				barbershops,
				barbershop,
				loading,
				errors,
				getBarbershops,
			}}
		>
			{children}
		</Provider>
	)
}
