import DashboardLayout from '../components/DashboardLayout'
import Stats from '../components/Stats'
import UserAppointmentsList from '../components/UserAppointmentsList'
import PageHeaderWithButton from '../components/PageHeaderWithButton'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import NewAppointment from '../components/NewAppointment'

export default function BarberAppointments() {
	const [open, setOpen] = useState(false)

	const newAppointmentHandler = () => {
		setOpen(true)
	}

	return (
		<DashboardLayout currentTab='appointments'>
			{open && <NewAppointment open={open} setOpen={setOpen} />}
			<PageHeaderWithButton
				title='Your Appointments'
				button='New Appointment'
				icon={<PlusIcon className='w-6 h-6 mr-2' />}
				onClick={newAppointmentHandler}
			/>
			<Stats />
			{/* //TODO: Rename UserAppointmentsList to something more generic for reusability. */}
			{/* //TODO: Implement a filter to filter appointments by today, this week, this month, last 6 months, last year */}
			<section className='mt-6 space-y-6'>
				<UserAppointmentsList title='Available Appointments' />
				<UserAppointmentsList title='Booked Appointments' />
				<UserAppointmentsList title='Completed Appointments' />
			</section>
		</DashboardLayout>
	)
}
