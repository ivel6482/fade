import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { UserContext } from '../store/contexts/userContext'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import UserAppoinmentsList from '../components/UserAppointmentsList'

export default function UserAppointments() {
	const { user } = useContext(UserContext)
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
			<h2 className='text-6xl font-bold text-gray-200 lg:text-7xl 2xl:text-9xl'>
				Your Appointments
			</h2>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<div className='mt-6 space-y-6'>
					<UserAppoinmentsList
						title='Booked'
						appointments={activeUserAppointments}
					/>
					<UserAppoinmentsList
						title='Completed'
						appointments={completedUserAppointments}
					/>
				</div>
			)}
		</DashboardLayout>
	)
}
