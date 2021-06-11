import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { UserContext } from '../store/contexts/userContext'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import UserAppoinmentsList from '../components/UserAppointmentsList'

export default function UserAppointments() {
	const { user } = useContext(UserContext)
	const { getUserAppointments, userAppointments, loading } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getUserAppointments(user._id)
	}, [])

	return (
		<DashboardLayout currentTab='appointments'>
			<h2 className='text-6xl font-bold text-gray-200 lg:text-8xl 2xl:text-9xl'>
				Your Appointments
			</h2>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<div className='space-y-6'>
					<UserAppoinmentsList title='Active' appointments={userAppointments} />
					<UserAppoinmentsList
						title='Completed'
						appointments={userAppointments}
					/>
				</div>
			)}
		</DashboardLayout>
	)
}
