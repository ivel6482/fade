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
					<p>Total appointments: {appointmentsCount}</p>
					<UserAppointmentsList
						title='Appointments'
						appointments={appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
