import { useContext, useEffect } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { AppointmentsList } from '../components/AppointmentsList'
import { AdminContext } from '../store/contexts/adminContext'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export const AdminAppointments = () => {
	const { loading, appointmentsCount, appointments, getAppointments } =
		useContext(AdminContext)

	useEffect(() => {
		getAppointments()
		// eslint-disable-next-line
	}, [])

	const stats = [
		{
			name: 'Total Appointments',
			stat: appointmentsCount,
		},
	]

	return (
		<DashboardLayout currentTab='appointments'>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<>
					{/* <Stats stats={stats} /> */}
					<div className='flex justify-between gap-2 mb-4 sm:justify-end'>
						<Link
							to='/appointments/new'
							type='button'
							className='flex items-center gap-2 px-3 py-2 text-blue-900 transition bg-white border border-blue-900 rounded-md hover:bg-gray-100'
						>
							<PlusIcon width='20' height='20' /> Create Appointment
						</Link>
						<Link
							to='/appointments/book'
							type='button'
							className='flex items-center gap-2 px-3 py-2 text-gray-200 transition bg-blue-900 rounded-md hover:bg-blue-800'
						>
							<PlusIcon width='20' height='20' /> Book Appointment
						</Link>
					</div>

					<AppointmentsList
						title='Appointments'
						appointments={appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
