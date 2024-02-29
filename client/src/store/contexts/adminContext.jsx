import { fadeApi } from "../../utils/axiosInstance";
import { createContext, useReducer } from 'react'
import { adminReducer } from '../reducers/adminReducer'
import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	CREATE_USER_FAIL,
	DELETE_USER_FAIL,
	UPDATE_BARBERS_SUCCESS,
	UPDATE_BARBERS_FAIL,
} from '../actions/adminActions'

const inititalState = {
	usersCount: 0,
	users: [],
	user: {},
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
		loading,
		errors,
	} = state

	const getUser = async (id) => {
		try {
			dispatch({ type: GET_USER_REQUEST })
			const res = await fadeApi.get(`/users/${id}`)
			dispatch({ type: GET_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: GET_USER_FAIL, payload: error.response.data.message })
		}
	}

	const updateUser = async (id, data) => {
		try {
			dispatch({ type: UPDATE_USER_REQUEST })
			const res = await fadeApi.put(`/users/${id}`, data)
			dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
		}
	}

	const createUser = async (data, navigate) => {
		try {
			await fadeApi.post('/auth/signup', data)
			navigate('/users')
		} catch (error) {
			console.error(error)
			dispatch({ type: CREATE_USER_FAIL, payload: error.response.data.message })
		}
	}

	const deleteUser = async (id, navigate) => {
		try {
			await fadeApi.delete(`/users/${id}`)
			navigate('/users')
		} catch (error) {
			console.error(error)
			dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message })
		}
	}

	const updateBarber = async (id, data) => {
		try {
			const res = await fadeApi.put(`/barbers/${id}`, data)
			dispatch({ type: UPDATE_BARBERS_SUCCESS, payload: res.data.barber })
		} catch (error) {
			console.error(error)
			dispatch({ UPDATE_BARBERS_FAIL, payload: error.response.data.message })
		}
	}

	return (
		<Provider
			value={{
				usersCount,
				users,
				user,
				loading,
				errors,
				getUser,
				updateUser,
				createUser,
				deleteUser,
				updateBarber,
			}}
		>
			{children}
		</Provider>
	)
}
