import { createContext, useReducer } from 'react'
import { fadeApi } from "../../utils/axiosInstance"
import { userReducer } from '../reducers/userReducers'
import {
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_FAIL,
	GET_LOGGED_IN_USER_REQUEST,
	GET_LOGGED_IN_USER_FAIL,
	GET_LOGGED_IN_USER_SUCCESS,
	UPDATE_USER_INFORMATION_REQUEST,
	UPDATE_USER_INFORMATION_SUCCESS,
	UPDATE_USER_INFORMATION_FAIL,
} from '../actions/userActions'

// TODO: Implement session management using next-auth npm package

const initialState = {
	token: localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token'))
		: null,
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,
	isAuthenticated: localStorage.getItem('isAuthenticated')
		? JSON.parse(localStorage.getItem('isAuthenticated'))
		: false,
	loading: false,
	errors: [],
}

export const UserContext = createContext()
const { Provider } = UserContext

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState)
	const { user, isAuthenticated, token, loading, errors } = state

	// -------------------------------------------------------------------------
	//                              - Actions -
	// -------------------------------------------------------------------------

	const getLoggedInUser = () => {
		dispatch({
			type: GET_LOGGED_IN_USER_REQUEST,
		})
		const user = localStorage.getItem('user')

		if (user) {
			dispatch({ type: GET_LOGGED_IN_USER_SUCCESS, payload: user })
		} else {
			dispatch({
				type: GET_LOGGED_IN_USER_FAIL,
				payload: 'Error getting logged in user.',
			})
		}
	}

	const barberSignup = async (
		firstName,
		lastName,
		email,
		password,
		navigate,
		displayNotification
	) => {
		try {
			dispatch({ type: SIGNUP_USER_REQUEST })
			const newUser = {
				firstName,
				lastName,
				email,
				password,
				role: 'barber',
			}
			await fadeApi.post('/auth/signup', newUser)
			login(email, password, navigate)
		} catch (error) {
			console.error(error.response.data.message)
			displayNotification(error.response.data.message)
			dispatch({
				type: SIGNUP_USER_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const logout = (navigate) => {
		dispatch({ type: LOGOUT_USER_REQUEST })
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		localStorage.removeItem('isAuthenticated')
		dispatch({ type: LOGOUT_USER_SUCCESS })
		navigate('/login')
		// FIXME: Add trycatch block
	}

	const updateUserInformation = async (id, data) => {
		try {
			dispatch({ type: UPDATE_USER_INFORMATION_REQUEST })
			const res = await fadeApi.put(`/users/${id}`, data)
			localStorage.setItem('user', JSON.stringify(res.data))
			dispatch({
				type: UPDATE_USER_INFORMATION_SUCCESS,
				payload: res.data,
			})
		} catch (error) {
			console.error(error)
			dispatch({
				type: UPDATE_USER_INFORMATION_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	return (
		<Provider
			value={{
				token,
				errors,
				logout,
				getLoggedInUser,
				updateUserInformation,
				barberSignup,
			}}
		>
			{children}
		</Provider>
	)
}
