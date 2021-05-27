import { createContext, useReducer } from 'react'
import axios from 'axios'
import { userReducer } from '../reducers/userReducers'
import {
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	// LOGOUT_USER_FAIL,
	// LOGOUT_USER_SUCCESS,
	SIGNUP_USER,
	SIGNUP_USER_FAIL,
	SIGNUP_USER_SUCCESS,
	GET_LOGGED_IN_USER,
	GET_LOGGED_IN_USER_FAIL,
	GET_LOGGED_IN_USER_SUCCESS,
} from '../actions/userActions'

// TODO: Implement session management using next-auth npm package

const initialState = {
	user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
	isAuthenticated: localStorage.getItem('isAuthenticated')
		? localStorage.getItem('isAuthenticated')
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
			type: GET_LOGGED_IN_USER,
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

	const login = async ({ email, password }) => {
		try {
			dispatch({ type: LOGIN_USER })
			const res = await axios.post(
				'/auth/login',
				{ email, password },
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			)

			dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error)
			dispatch({ type: LOGIN_USER_FAIL, payload: error.message })
		}
	}

	const signup = async ({ firstName, lastName, email, password }) => {
		try {
			dispatch({ type: SIGNUP_USER })
			const newUser = JSON.stringify({
				firstName,
				lastName,
				email,
				password,
			})
			const res = await axios.post('/auth/signup', newUser)
			console.log(res)
			dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data })
		} catch (error) {
			console.error(error.response.data.message)
			dispatch({
				type: SIGNUP_USER_FAIL,
				payload: error.response.data.message,
			})
		}
	}

	const logout = () => {
		dispatch({ type: LOGOUT_USER })
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
