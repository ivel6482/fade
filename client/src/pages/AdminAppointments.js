import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import UserAppointmentsList from '../components/UserAppointmentsList'
import Stats from '../components/Stats'
import { AdminContext } from '../store/contexts/adminContext'
import { UserContext } from '../store/contexts/userContext'

export default function AdminAppointments() {
	const { token } = useContext(UserContext)
	const { loading, appointmentsCount, appointments, getAppointments } =
		useContext(AdminContext)

	useEffect(() => {
		getAppointments(token)
	}, [])

	const stats = [
		{
			name: 'Total Appointments',
			stat: appointmentsCount,
		},
	]

	return (
		<DashboardLayout currentTab='appointments'>
			<h3 className='font-bold text-gray-300 text-8xl'>Appointments</h3>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<>
					<Stats stats={stats} />
					<UserAppointmentsList
						title='Appointments'
						appointments={appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
