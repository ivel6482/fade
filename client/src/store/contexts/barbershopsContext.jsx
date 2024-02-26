import { createContext, useReducer } from 'react'
import { fadeApi } from "../../utils/axiosInstance"
import { barbershopsReducer } from '../reducers/barbershopsReducer'
import {
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
} from '../actions/barbershopsActions'

const initialState = {
	barbershops: [],
	barbershop: {},
	barbers: [],
	appointments: [],
	userAppointments: [],
	activeUserAppointments: [],
	completedUserAppointments: [],
	loading: false,
	errors: [],
}

export const BarbershopsContext = createContext()
const { Provider } = BarbershopsContext

export const BarbershopsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(barbershopsReducer, initialState)
	const {
		barbershops,
		barbershop,
		barbers,
		appointments,
		userAppointments,
		loading,
		errors,
	} = state

	const getBarbers = async (id) => {
		try {
			dispatch({ type: GET_BARBERSHOP_BARBER_REQUEST })
			const res = await fadeApi.get(`/barbershops/${id}/barbers`)
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
			const res = await fadeApi.get(`/barbers/${id}/appointments`)
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

	const bookAppointment = async (id, userId) => {
		try {
			dispatch({ type: BOOK_APPOINTMENT_REQUEST })
			const res = await fadeApi.put(
				`/appointments/${id}/book`,
				{
					userId,
				}
			)
			dispatch({
				type: BOOK_APPOINTMENT_SUCCESS,
				payload: res.data.appointment._id,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: BOOK_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const cancelAppointment = async (id) => {
		try {
			dispatch({
				type: CANCEL_APPOINTMENT_REQUEST,
			})
			const res = await fadeApi.put(
				`/appointments/${id}/cancel`,
				{},
			)
			dispatch({
				type: CANCEL_APPOINTMENT_SUCCESS,
				payload: res.data.appointment._id,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: CANCEL_APPOINTMENT_FAIL,
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
				userAppointments,
				barbers,
				loading,
				errors,
				getBarbers,
				getBarberAppointments,
				bookAppointment,
				cancelAppointment,
			}}
		>
			{children}
		</Provider>
	)
}
