import { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { notificationsReducer } from '../reducers/notificationsReducer'
import {
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION,
} from '../actions/notificationsActions'
const initialState = {
	notifications: [],
	show: false,
}

export const NotificationContext = createContext()

const { Provider } = NotificationContext

export const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationsReducer, initialState)
	const { notifications, show } = state

	//TODO: Support multiple notifications stacked.

	const displayNotification = (message) => {
		const id = uuidv4()
		const notification = {
			id,
			message,
		}
		dispatch({ type: SHOW_NOTIFICATION, payload: notification })

		setTimeout(() => {
			dispatch({ type: HIDE_NOTIFICATION, payload: id })
		}, 3000)
	}

	const hideNotification = (id) => {
		dispatch({ type: HIDE_NOTIFICATION, payload: id })
	}

	return (
		<Provider
			value={{
				notifications,
				show,
				displayNotification,
				hideNotification,
			}}
		>
			{children}
		</Provider>
	)
}
