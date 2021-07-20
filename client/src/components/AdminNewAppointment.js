import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import DashboardLayout from './DashboardLayout'

export default function AdminNewAppointment() {
	const history = useHistory()
	const { loading, barbers, getBarbers, createAppointment } =
		useContext(AdminContext)
	const { displayNotification } = useContext(NotificationContext)
	const [barberId, setBarberId] = useState('')
	const [time, setTime] = useState('')

	const hours = [
		'12:00 AM',
		'1:00 AM',
		'2:00 AM',
		'3:00 AM',
		'4:00 AM',
		'5:00 AM',
		'6:00 AM',
		'7:00 AM',
		'8:00 AM',
		'9:00 AM',
		'10:00 AM',
		'11:00 AM',
		'12:00 PM',
		'1:00 PM',
		'2:00 PM',
		'3:00 PM',
		'4:00 PM',
		'5:00 PM',
		'6:00 PM',
		'7:00 PM',
		'8:00 PM',
		'9:00 PM',
		'10:00 PM',
		'11:00 PM',
	]

	useEffect(() => {
		getBarbers()
		// eslint-disable-next-line
	}, [])

	const submitHandler = (e) => {
		e.preventDefault()
		if (barberId === '' || time === '') {
			displayNotification('Please enter all the required information')
		} else {
			createAppointment({ barberId, time }, history, displayNotification)
		}
	}

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
										className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
									>
										<option>Select a barber</option>
										{barbers.map((barber) => (
											<option key={barber._id} value={barber._id}>
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
									Time
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<select
										id='time'
										name='time'
										autoComplete='time'
										value={time}
										onChange={(e) => setTime(e.target.value)}
										className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
									>
										<option>Select a time</option>
										{hours.map((hour) => (
											<option key={hour} value={hour}>
												{hour}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<button
								//TODO: Replace all cancel buttons to use the history.goBack() method.
								onClick={() => history.goBack()}
								type='button'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
