import { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import UserAppointmentsList from '../components/UserAppointmentsList'
import Stats from '../components/Stats'
import { AdminContext } from '../store/contexts/adminContext'
import { UserContext } from '../store/contexts/userContext'
import { PlusIcon } from '@heroicons/react/solid'
import AdminNewAppointment from '../components/AdminNewAppointment'

export default function AdminAppointments() {
	const { token } = useContext(UserContext)
	const { loading, appointmentsCount, appointments, getAppointments } =
		useContext(AdminContext)
	const [open, setOpen] = useState(false)

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
					{open && <AdminNewAppointment open={open} setOpen={setOpen} />}
					<Stats stats={stats} />
					<div className='flex justify-end'>
						<button
							onClick={() => setOpen(true)}
							type='button'
							className='flex items-center gap-2 px-3 py-2 text-white transition bg-gray-900 rounded-md hover:bg-gray-700'
						>
							<PlusIcon width='20' height='20' /> Book Appointment
						</button>
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
