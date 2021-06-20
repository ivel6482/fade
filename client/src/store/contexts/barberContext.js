import { createContext, useReducer } from 'react'
import axios from 'axios'
import {
	POST_APPOINTMENT_REQUEST,
	POST_APPOINTMENT_SUCCESS,
	POST_APPOINTMENT_FAIL,
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

	const postAppointment = async (time, barberId) => {
		try {
			dispatch({ type: POST_APPOINTMENT_REQUEST })
			const newAppointment = {
				time,
				barberId,
			}

			const res = await axios.post('/appointments', newAppointment)
			console.log(res.data)
			// dispatch({
			// 	type: POST_APPOINTMENT_SUCCESS,
			// 	payload: res.data.appointment,
			// })
		} catch (error) {
			console.error(error)
			dispatch({
				type: POST_APPOINTMENT_FAIL,
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
			}}
		>
			{children}
		</Provider>
	)
}
