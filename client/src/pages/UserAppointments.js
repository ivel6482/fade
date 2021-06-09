import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { UserContext } from '../store/contexts/userContext'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import Appointment from '../components/Appointment'

export default function UserAppointments() {
	const { user } = useContext(UserContext)
	const { getUserAppointments, userAppointments } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getUserAppointments(user._id)
	}, [])

	return (
		<DashboardLayout currentTab='appointments'>
			<h2 className='text-6xl font-bold text-gray-200 lg:text-8xl 2xl:text-9xl'>
				Your Appointments
			</h2>
			{userAppointments.length === 0 ? (
				<p>You do not have any appointments.</p>
			) : (
				userAppointments.map((appointment) => (
					<Appointment key={appointment._id} appointment={appointment} />
				))
			)}
		</DashboardLayout>
	)
}
