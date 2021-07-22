import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { UserContext } from '../store/contexts/userContext'
import DashboardLayout from './DashboardLayout'

export default function AdminBookAppointment() {
	const history = useHistory()
	const {
		loading,
		barbers,
		getBarbers,
		bookAppointment,
		getUsers,
		users,
		barberAppointments,
		getBarberAvailableAppointments,
	} = useContext(AdminContext)
	const { token } = useContext(UserContext)
	const { displayNotification } = useContext(NotificationContext)
	const [barberId, setBarberId] = useState('')
	const [userId, setUserId] = useState('')
	const [appointmentId, setAppointmentId] = useState('')

	useEffect(() => {
		getBarbers()
		getUsers()
		// eslint-disable-next-line
	}, [])

	const getAppointments = (id) => {
		getBarberAvailableAppointments(id)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (barberId === '' || userId === '' || appointmentId === '') {
			displayNotification('Please enter all the required information')
		} else {
			bookAppointment({ userId, appointmentId }, history, token)
			displayNotification('Appointment booked successfully.')
		}
	}

	//TODO: Add date picker for appointments, can only select from the current day to future days.

	return (
		<DashboardLayout currentTab='appointments'>
			{loading ? (
				<p>Loading...</p>
			) : (
				//TODO: Indicate all the required fields with *required
				<form
					onSubmit={submitHandler}
					className='space-y-8 divide-y divide-gray-200'
				>
					<div className='space-y-8 sm:space-y-5'>
						<div>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									New Appointment
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									Create an appointment for a specific barber
								</p>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='barber'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									Barber
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<select
										id='barber'
										name='barber'
										autoComplete='barber'
										value={barberId}
										onChange={(e) => setBarberId(e.target.value)}
										className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
									>
										<option>Select a barber</option>
										{barbers.map((barber) => (
											<option
												onClick={() => getAppointments(barber._id)}
												key={barber._id}
												value={barber._id}
											>
												{barber.firstName} {barber.lastName}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='time'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									Available Appointments
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									{barberAppointments.length > 0 ? (
										<select
											id='appointment'
											name='appointment'
											autoComplete='appointment'
											value={appointmentId}
											onChange={(e) => setAppointmentId(e.target.value)}
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
										>
											<option>Select an appointment</option>
											{barberAppointments.map((appointment) => (
												<option key={appointment._id} value={appointment._id}>
													{appointment.time}
												</option>
											))}
										</select>
									) : (
										<p>Select a barber above</p>
									)}
								</div>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='time'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									User
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<select
										id='user'
										name='user'
										autoComplete='user'
										value={userId}
										onChange={(e) => setUserId(e.target.value)}
										className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
									>
										<option>Select a user</option>
										{users.map((user) => (
											<option key={user._id} value={user._id}>
												{user.firstName} {user.lastName}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<Link
								to='/appointments'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</DashboardLayout>
	)
}
