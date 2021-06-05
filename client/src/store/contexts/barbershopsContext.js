import { createContext, useReducer } from 'react'
import axios from 'axios'
import { barbershopsReducer } from '../reducers/barbershopsReducer'
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
} from '../actions/barbershopsActions'

const initialState = {
	barbershops: [],
	barbershop: null,
	barbers: [],
	appointments: [],
	loading: false,
	errors: [],
}

export const BarbershopsContext = createContext()
const { Provider } = BarbershopsContext

export const BarbershopsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(barbershopsReducer, initialState)
	const { barbershops, barbershop, barbers, appointments, loading, errors } =
		state

	const getBarbershops = async () => {
		try {
			dispatch({ type: GET_BARBERSHOPS_REQUEST })
			const res = await axios.get('/barbershops')
			dispatch({ type: GET_BARBERSHOPS_SUCCESS, payload: res.data.barbershops })
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_BARBERSHOPS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getBarbershop = async (id) => {
		try {
			dispatch({ type: GET_BARBERSHOP_REQUEST })
			const res = await axios.get(`/barbershops/${id}`)
			dispatch({
				type: GET_BARBERSHOP_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_BARBERSHOP_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getBarbers = async (id) => {
		try {
			dispatch({ type: GET_BARBERSHOP_BARBER_REQUEST })
			const res = await axios.get(`/barbershops/${id}/barbers`)
			dispatch({
				type: GET_BARBERSHOP_BARBER_SUCCESS,
				payload: res.data.barbers,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_BARBERSHOP_BARBER_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getBarberAppointments = async (id) => {
		try {
			dispatch({ type: GET_BARBERS_APPOINTMENTS_REQUEST })
			const res = await axios.get(`/barbers/${id}/appointments`)
			dispatch({
				type: GET_BARBERS_APPOINTMENTS_SUCCESS,
				payload: res.data.appointments,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_BARBERS_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	return (
		<Provider
			value={{
				barbershops,
				barbershop,
				appointments,
				barbers,
				loading,
				errors,
				getBarbershops,
				getBarbershop,
				getBarbers,
				getBarberAppointments,
			}}
		>
			{children}
		</Provider>
	)
}
