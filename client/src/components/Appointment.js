import { useContext, useState } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { UserContext } from '../store/contexts/userContext'
import { CalendarIcon } from '@heroicons/react/solid'

export default function Appointment({ appointment }) {
	const [booked, setBooked] = useState(appointment.booked)
	const { bookAppointment, cancelAppointment, loading } =
		useContext(BarbershopsContext)
	const { token } = useContext(UserContext)

	// const bookAppointmentHandler = (id) => {
	// 	bookAppointment(id, token)
	// }

	// const cancelAppointmentHandler = (id) => {
	// 	cancelAppointment(id, token)
	// }

	//FIXME: The button does not change the function to trigger based on `appointment.booked` state. Make it change text and disabled when booked and trigger the cancelAppointment action instead of re-calling the bookAppointment action
	const handleAppointment = (id) => {
		if (appointment.booked) {
			console.log('Cancel')
			cancelAppointment(id, token)
			setBooked(!booked)
		} else {
			console.log('Book')
			bookAppointment(id, token)
			setBooked(!booked)
		}
	}

	const disabledButton = (
		<button
			className='px-2 py-1 text-indigo-400 transition bg-indigo-200 rounded-md'
			// disabled
			onClick={() => handleAppointment(appointment._id)}
		>
			Booked
		</button>
	)

	const availableButton = (
		<button
			className='px-2 py-1 text-white transition bg-indigo-500 rounded-md hover:shadow-md hover:bg-indigo-600'
			onClick={() => handleAppointment(appointment._id)}
		>
			Book Now
		</button>
	)

	return (
		<li className='flex items-center justify-between p-3 text-indigo-600 bg-indigo-100 border border-indigo-100 rounded-md hover:border-indigo-400'>
			<section className='flex space-x-2'>
				<CalendarIcon width='20' className='text-indigo-400' />
				<p>{appointment.time}</p>
			</section>
			{appointment.booked && booked ? disabledButton : availableButton}
		</li>
	)
}
