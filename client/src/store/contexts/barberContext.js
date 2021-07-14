import { createContext, useReducer } from 'react'
import axios from 'axios'
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
	DELETE_APPOINTMENT_SUCCESS,
	DELETE_APPOINTMENT_FAIL,
	COMPLETE_APPOINTMENT_SUCCESS,
	COMPLETE_APPOINTMENT_FAIL,
} from '../actions/barberActions'
import barbersReducer from '../reducers/barbersReducer'

const initialState = {
	availableAppointments: [],
	bookedAppointments: [], // * this refers to appointments that costumers have booked with the barber, not appointments that the barber has booked (this would be in the users context).
	completedAppointments: [],
	loading: false,
	errors: [],
}

export const BarbersContext = createContext()
const { Provider } = BarbersContext

export const BarbersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(barbersReducer, initialState)
	const {
		availableAppointments,
		bookedAppointments,
		completedAppointments,
		errors,
		loading,
	} = state

	const postAppointment = async (time, barberId, history) => {
		try {
			dispatch({ type: POST_APPOINTMENT_REQUEST })
			const newAppointment = {
				time,
				barberId,
			}

			const res = await axios.post('/appointments', newAppointment)
			dispatch({
				type: POST_APPOINTMENT_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: POST_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getAvailableAppointments = async (barberId) => {
		try {
			dispatch({
				type: GET_USER_AVAILABLE_APPOINTMENTS_REQUEST,
			})
			const res = await axios.get(`/barbers/${barberId}/appointments/available`)
			dispatch({
				type: GET_USER_AVAILABLE_APPOINTMENTS_SUCCESS,
				payload: res.data.appointments,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_USER_AVAILABLE_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const barberDeleteAppointment = async (id) => {
		try {
			await axios.delete(`/appointments/${id}`)
			dispatch({ type: DELETE_APPOINTMENT_SUCCESS, payload: id })
		} catch (error) {
			console.error(error)
			dispatch({
				type: DELETE_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getBookedAppointments = async (id) => {
		try {
			dispatch({ type: GET_USER_BOOKED_APPOINTMENTS_REQUEST })
			const res = await axios.get(`/barbers/${id}/appointments/booked`)
			dispatch({
				type: GET_USER_BOOKED_APPOINTMENTS_SUCCESS,
				payload: res.data.appointments,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_USER_BOOKED_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getCompletedAppointments = async (id) => {
		try {
			dispatch({ type: GET_USER_COMPLETED_APPOINTMENTS_REQUEST })
			const res = await axios.get(`/barbers/${id}/appointments/complete`)
			dispatch({
				type: GET_USER_COMPLETED_APPOINTMENTS_SUCCESS,
				payload: res.data.appointments,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_USER_COMPLETED_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const completeAppointment = async (id, token) => {
		try {
			const res = await axios.put(`/appointments/${id}/complete`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(res.data.appointment)
			dispatch({
				type: COMPLETE_APPOINTMENT_SUCCESS,
				payload: res.data.appointment,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: COMPLETE_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	return (
		<Provider
			value={{
				availableAppointments,
				completedAppointments,
				bookedAppointments,
				errors,
				loading,
				postAppointment,
				getAvailableAppointments,
				barberDeleteAppointment,
				getBookedAppointments,
				getCompletedAppointments,
				completeAppointment,
			}}
		>
			{children}
		</Provider>
	)
}
