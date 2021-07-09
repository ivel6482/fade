import axios from 'axios'
import { createContext, useReducer } from 'react'
import adminReducer from '../reducers/adminReducer'
import {
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
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
	CREATE_APPOINTMENT_REQUEST,
	CREATE_APPOINTMENT_SUCCESS,
	CREATE_APPOINTMENT_FAIL,
	DELETE_APPOINTMENT_REQUEST,
	DELETE_APPOINTMENT_SUCCESS,
	DELETE_APPOINTMENT_FAIL,
	GET_BARBERS_AVAILABLE_APPOINTMENTS_REQUEST,
	GET_BARBERS_AVAILABLE_APPOINTMENTS_SUCCESS,
	GET_BARBERS_AVAILABLE_APPOINTMENTS_FAIL,
	BOOK_APPOINTMENT_REQUEST,
	BOOK_APPOINTMENT_SUCCESS,
	BOOK_APPOINTMENT_FAIL,
} from '../actions/adminActions'

const inititalState = {
	usersCount: 0,
	users: [],
	user: {},
	barbersCount: 0,
	barbers: [],
	barber: null,
	barbershopsCount: 0,
	barbershops: [],
	barbershop: null,
	appointmentsCount: 0,
	appointments: [],
	appointment: null,
	barberAppointments: [],
	loading: false,
	errors: [],
}

export const AdminContext = createContext()
const { Provider } = AdminContext

export const AdminProvider = ({ children }) => {
	const [state, dispatch] = useReducer(adminReducer, inititalState)
	const {
		usersCount,
		users,
		user,
		barbersCount,
		barbers,
		barber,
		barbershopsCount,
		barbershops,
		barbershop,
		appointmentsCount,
		appointments,
		appointment,
		barberAppointments,
		loading,
		errors,
	} = state

	const getUsers = async () => {
		try {
			dispatch({ type: GET_USERS_REQUEST })
			const res = await axios.get('/users')
			dispatch({
				type: GET_USERS_SUCCESS,
				payload: {
					count: res.data.count,
					users: res.data.users,
				},
			})
		} catch (error) {
			console.error(error)
			dispatch({ type: GET_USERS_FAIL, payload: error.response.data.message })
		}
	}

	const getUser = async (id) => {
		try {
			dispatch({ type: GET_USER_REQUEST })
			const res = await axios.get(`/users/${id}`)
			dispatch({ type: GET_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: GET_USER_FAIL, payload: error.response.data.message })
		}
	}

	const updateUser = async (id, data) => {
		try {
			dispatch({ type: UPDATE_USER_REQUEST })
			const res = await axios.put(`/users/${id}`, data)
			dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
		}
	}

	const getAppointments = async (token) => {
		try {
			dispatch({ type: GET_APPOINTMENTS_REQUEST })
			const res = await axios.get('/appointments', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: GET_APPOINTMENTS_SUCCESS,
				payload: {
					count: res.data.count,
					appointments: res.data.appointments,
				},
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const getBarbers = async () => {
		try {
			dispatch({ type: GET_BARBERS_REQUEST })
			//FIXME: This is incorrect we have to query the user collection that have the role of barber.
			const res = await axios.get('/barbers')
			dispatch({
				type: GET_BARBERS_SUCCESS,
				payload: {
					count: res.data.count,
					barbers: res.data.barbers,
				},
			})
		} catch (error) {
			console.error(error)
			dispatch({ type: GET_BARBERS_FAIL, payload: error.response.data.message })
		}
	}

	const createBarbershop = async (data, token, history) => {
		try {
			dispatch({ type: CREATE_BARBERSHOP_REQUEST })
			const res = await axios.post('/barbershops', data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: CREATE_BARBERSHOP_SUCCESS,
				payload: res.data.barbershop,
			})
			history.push(`/barbershops/${res.data.barbershop._id}`)
		} catch (error) {
			console.error(error)
			dispatch({
				type: CREATE_BARBERSHOP_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const updateBarbershop = async (id, data) => {
		try {
			dispatch({ type: UPDATE_BARBERSHOP_REQUEST })
			const res = await axios.put(`/barbershops/${id}`, data)
			console.log(res.data)
			// dispatch({ type: UPDATE_BARBERSHOP_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({
				type: UPDATE_BARBERSHOP_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const deleteBarbershop = async (id, history) => {
		try {
			dispatch({ type: DELETE_BARBERSHOP_REQUEST })
			await axios.delete(`/barbershops/${id}`)
			dispatch({ type: DELETE_BARBERSHOP_SUCCESS, payload: id })
			history.push('/dashboard')
		} catch (error) {
			console.error(error)
			dispatch({
				type: DELETE_BARBERSHOP_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const createAppointment = async (data, history) => {
		try {
			dispatch({ type: CREATE_APPOINTMENT_REQUEST })
			const res = await axios.post('/appointments', data)
			console.log(res.data)
			dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: res.data })
			history.push('/appointments')
		} catch (error) {
			console.error(error)
			dispatch({
				type: CREATE_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const deleteAppointment = async (id) => {
		try {
			//TODO: Check for unnecessary request dispatch
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

	const getBarberAvailableAppointments = async (id) => {
		try {
			// dispatch({ type: GET_BARBERS_AVAILABLE_APPOINTMENTS_REQUEST })
			//TODO: Create a controller that fetches the barbers available appointments.
			const res = await axios.get(`/barbers/${id}/appointments/available`)
			console.log(res.data.appointments)
			dispatch({
				type: GET_BARBERS_AVAILABLE_APPOINTMENTS_SUCCESS,
				payload: res.data.appointments,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: GET_BARBERS_AVAILABLE_APPOINTMENTS_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const bookAppointment = async (data, history, token) => {
		try {
			const { userId, appointmentId } = data
			const res = await axios.put(
				`/appointments/${appointmentId}/book`,
				{
					userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			console.log(res.data)
			history.push('/appointments')
		} catch (error) {
			console.error(error)
			dispatch({
				type: BOOK_APPOINTMENT_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	return (
		<Provider
			value={{
				usersCount,
				users,
				user,
				barbersCount,
				barbers,
				barber,
				barbershopsCount,
				barbershops,
				barbershop,
				appointmentsCount,
				appointments,
				appointment,
				barberAppointments,
				loading,
				errors,
				getUsers,
				getUser,
				updateUser,
				getAppointments,
				getBarbers,
				createBarbershop,
				updateBarbershop,
				deleteBarbershop,
				createAppointment,
				deleteAppointment,
				getBarberAvailableAppointments,
				bookAppointment,
			}}
		>
			{children}
		</Provider>
	)
}
