import { useContext } from 'react'
import { AdminContext } from '../store/contexts/adminContext'
import { UserContext } from '../store/contexts/userContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { BarbersContext } from '../store/contexts/barberContext'

export default function AppointmentRow({ appointment }) {
	const { token, user } = useContext(UserContext)
	const { deleteAppointment, cancelAppointment } = useContext(AdminContext)
	const { barberDeleteAppointment, completeAppointment } =
		useContext(BarbersContext)
	const { displayNotification } = useContext(NotificationContext)

	const formattedDate = new Date(appointment.createdAt).toLocaleDateString(
		undefined,
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	)

	const deleteHandler = (id) => {
		if (user.role === 'barber') {
			barberDeleteAppointment(id)
			displayNotification('Appointment deleted successfully.')
		} else {
			deleteAppointment(id)
			displayNotification('Appointment deleted successfully.')
		}
	}

	const cancelHandler = (id) => {
		cancelAppointment(id, token)
		displayNotification('Appointment cancelled successfully.')
	}

	const completeHandler = (id) => {
		completeAppointment(id, token)
		displayNotification('Appointment marked as completed successfully.')
	}

	return (
		<>
			<tr
				key={appointment._id}
				className='transition even:bg-gray-50 hover:bg-indigo-50'
			>
				<td className='px-6 py-4 whitespace-nowrap'>
					<div className='flex items-center'>
						{/* <div className='flex-shrink-0 w-10 h-10'>
														<img className="w-10 h-10 rounded-full" src={person.image} alt="" />
													</div> */}
						{/* <div className='ml-4'> */}
						<div className='text-sm font-medium text-gray-900'>
							{appointment.barberId.firstName} {appointment.barberId.lastName}
						</div>
						{/* <div className="text-sm text-gray-500">{person.email}</div> */}
						{/* </div> */}
					</div>
				</td>
				{/* <td className='px-6 py-4 whitespace-nowrap'>
												<div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
											</td> */}
				<td className='px-6 py-4 whitespace-nowrap'>
					{!appointment.completed && appointment.booked && (
						<span className='inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full'>
							Booked
						</span>
					)}
					{appointment.completed && (
						<span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
							Completed
						</span>
					)}
					{!appointment.completed && !appointment.booked && (
						<span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
							Available
						</span>
					)}
				</td>
				<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
					{appointment.time}
				</td>
				<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
					{formattedDate}
				</td>
				<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
					{appointment._id}
				</td>
				<td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
					{!appointment.completed && appointment.booked && (
						<>
							<button
								onClick={() => cancelHandler(appointment._id)}
								type='button'
								className='px-4 py-2 font-semibold text-indigo-600 transition rounded-md hover:text-indigo-900 hover:bg-indigo-300'
							>
								Cancel
							</button>
							<button
								type='button'
								onClick={() => completeHandler(appointment._id)}
								className='px-4 py-2 font-semibold text-indigo-600 transition rounded-md hover:text-indigo-900 hover:bg-indigo-300'
							>
								Complete
							</button>
						</>
					)}
					{!appointment.completed && !appointment.booked && (
						<button
							onClick={() => deleteHandler(appointment._id)}
							type='button'
							className='px-4 py-2 font-semibold text-indigo-600 transition rounded-md hover:text-indigo-900 hover:bg-indigo-300'
						>
							Delete
						</button>
					)}
				</td>
			</tr>
		</>
	)
}
