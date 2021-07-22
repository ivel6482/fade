import { useContext, useState } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { UserContext } from '../store/contexts/userContext'
import { CalendarIcon } from '@heroicons/react/solid'

export default function Appointment({ appointment }) {
	const {
		bookAppointment,
		cancelAppointment,
		// appointment: currentAppointment,
	} = useContext(BarbershopsContext)

	const [booked, setBooked] = useState(appointment.booked)
	const { token, user } = useContext(UserContext)

	//FIXME: The button does not change the function to trigger based on `appointment.booked` state. Make it change text and disabled when booked and trigger the cancelAppointment action instead of re-calling the bookAppointment action

	const handleAppointment = (id) => {
		if (appointment.booked) {
			cancelAppointment(id, token)
			setBooked(!booked)
		} else {
			bookAppointment(id, user._id, token)
			setBooked(!booked)
		}
	}

	const disabledButton = (
		<button
			className='px-2 py-1 text-gray-200 transition bg-blue-900 bg-opacity-75 rounded-md hover:bg-white hover:text-blue-900'
			// disabled
			onClick={() => handleAppointment(appointment._id)}
		>
			Booked
		</button>
	)

	const availableButton = (
		<button
			className='px-2 py-1 text-gray-200 transition bg-blue-900 rounded-md hover:shadow-md hover:bg-white hover:text-blue-900 focus:outline-none'
			onClick={() => handleAppointment(appointment._id)}
		>
			Book Now
		</button>
	)

	return (
		<li className='flex items-center justify-between p-3 text-gray-200 bg-blue-900 rounded-md'>
			<section className='flex space-x-2'>
				<CalendarIcon width='20' className='text-indigo-400' />
				<p>{appointment.time}</p>
			</section>
			{appointment.booked && booked ? disabledButton : availableButton}
		</li>
	)
}
