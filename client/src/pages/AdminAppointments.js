import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import UserAppointmentsList from '../components/UserAppointmentsList'
import { AdminContext } from '../store/contexts/adminContext'
import { UserContext } from '../store/contexts/userContext'

export default function AdminAppointments() {
	const { token } = useContext(UserContext)
	const { loading, appointmentsCount, appointments, getAppointments } =
		useContext(AdminContext)

	useEffect(() => {
		getAppointments(token)
	}, [])

	return (
		<DashboardLayout currentTab='appointments'>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<>
					<div className='mb-3'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>
							Last 30 days
						</h3>
						<dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3'>
							<div className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'>
								<dt className='text-sm font-medium text-gray-500 truncate'>
									Total appointments
								</dt>
								<dd className='mt-1 text-3xl font-semibold text-gray-900'>
									{appointmentsCount}
								</dd>
							</div>
						</dl>
					</div>
					<UserAppointmentsList
						title='Appointments'
						appointments={appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
