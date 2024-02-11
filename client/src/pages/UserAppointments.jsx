import { useContext, useEffect } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { UserAppointmentsList } from '../components/UserAppointmentsList'
import { useUser } from "../store/authStore"

export const UserAppointments = () => {
	const user = useUser();
	const {
		getActiveUserAppointments,
		getCompletedUserAppointments,
		activeUserAppointments,
		completedUserAppointments,
		loading,
	} = useContext(BarbershopsContext)

	useEffect(() => {
		getActiveUserAppointments(user._id)
		getCompletedUserAppointments(user._id)
		// eslint-disable-next-line
	}, [])

	return (
		<DashboardLayout currentTab='appointments'>
			<h2 className='text-4xl font-bold text-gray-200 lg:text-7xl'>
				Your Appointments
			</h2>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<div className='mt-6 space-y-6'>
					<UserAppointmentsList
						title='Booked'
						appointments={activeUserAppointments}
					/>
					<UserAppointmentsList
						title='Completed'
						appointments={completedUserAppointments}
					/>
				</div>
			)}
		</DashboardLayout>
	)
}
