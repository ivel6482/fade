import { createContext, useReducer } from 'react'
import { userReducer } from '../reducers/userReducers'
import {
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

	return (
		<Provider
			value={{
				token,
				errors,
				getLoggedInUser,
			}}
		>
			{children}
		</Provider>
	)
}
