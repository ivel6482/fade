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
				loading,
				errors,
				getUsers,
				getUser,
				updateUser,
				getAppointments,
				getBarbers,
				createBarbershop,
			}}
		>
			{children}
		</Provider>
	)
}
