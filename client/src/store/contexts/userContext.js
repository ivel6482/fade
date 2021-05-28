import { createContext, useReducer } from 'react'
import axios from 'axios'
import { userReducer } from '../reducers/userReducers'
import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_FAIL,
	LOGOUT_USER_SUCCESS,
	SIGNUP_USER_REQUEST,
	SIGNUP_USER_FAIL,
	SIGNUP_USER_SUCCESS,
	GET_LOGGED_IN_USER_REQUEST,
	GET_LOGGED_IN_USER_FAIL,
	GET_LOGGED_IN_USER_SUCCESS,
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
	const { user, isAuthenticated, loading, errors } = state

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

	const login = async (email, password, history) => {
		try {
			dispatch({ type: LOGIN_USER_REQUEST })
			const res = await axios.post(
				'/auth/login',
				{ email, password },
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			)

			localStorage.setItem('token', JSON.stringify(res.data.token))
			localStorage.setItem('user', JSON.stringify(res.data.user))
			localStorage.setItem('isAuthenticated', JSON.stringify(true))

			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: { token: res.data.token, user: res.data.user },
			})

			history.push('/dashboard')
		} catch (error) {
			console.error(error)
			dispatch({ type: LOGIN_USER_FAIL, payload: error.message })
		}
	}

	const signup = async (firstName, lastName, email, password, history) => {
		try {
			dispatch({ type: SIGNUP_USER_REQUEST })
			const newUser = JSON.stringify({
				firstName,
				lastName,
				email,
				password,
			})
			const res = await axios.post('/auth/signup', newUser)
			dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data })
			dispatch(login(res.data.user.email, res.data.user.password), history)
		} catch (error) {
			console.error(error.response.data.message)
			dispatch({
				type: SIGNUP_USER_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const logout = (history) => {
		dispatch({ type: LOGOUT_USER_REQUEST })
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		localStorage.removeItem('isAuthenticated')
		dispatch({ type: LOGOUT_USER_SUCCESS })
		history.push('/login')
		// FIXME: Add trycatch block
	}

	return (
		<Provider
			value={{
				user,
				isAuthenticated,
				loading,
				errors,
				login,
				signup,
				logout,
				getLoggedInUser,
			}}
		>
			{children}
		</Provider>
	)
}
