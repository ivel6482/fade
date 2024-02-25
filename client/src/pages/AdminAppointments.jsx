import { DashboardLayout } from '../components/DashboardLayout'
import { AppointmentsList } from '../components/AppointmentsList'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useAppointments } from '../queries/appointmentQueries'

export const AdminAppointments = () => {
	const { data, isLoading } = useAppointments();

	return (
		<DashboardLayout currentTab='appointments'>
			{isLoading ? (
				<p>Loading appointments...</p>
			) : (
				<>
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
						appointments={data.appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
