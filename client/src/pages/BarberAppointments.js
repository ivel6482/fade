import DashboardLayout from '../components/DashboardLayout'
import UserAppointmentsList from '../components/UserAppointmentsList'
import PageHeaderWithButton from '../components/PageHeaderWithButton'
import { useState, useEffect, useContext } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import NewAppointment from '../components/NewAppointment'
import { BarbersContext } from '../store/contexts/barberContext'
import { UserContext } from '../store/contexts/userContext'

export default function BarberAppointments() {
	const [open, setOpen] = useState(false)
	const {
		getAvailableAppointments,
		availableAppointments,
		getBookedAppointments,
		bookedAppointments,
		getCompletedAppointments,
		completedAppointments,
	} = useContext(BarbersContext)
	const { user } = useContext(UserContext)

	const newAppointmentHandler = () => {
		setOpen(true)
	}

	useEffect(() => {
		getAvailableAppointments(user._id)
		getBookedAppointments(user._id)
		getCompletedAppointments(user._id)
		// eslint-disable-next-line
	}, [])

	return (
		<DashboardLayout currentTab='appointments'>
			{open && <NewAppointment open={open} setOpen={setOpen} />}
			<PageHeaderWithButton
				title='Your Appointments'
				button='New Appointment'
				icon={<PlusIcon className='w-6 h-6 mr-2' />}
				onClick={newAppointmentHandler}
			/>
			{/* //TODO: Rename UserAppointmentsList to something more generic for reusability. */}
			{/* //TODO: Implement a filter to filter appointments by today, this week, this month, last 6 months, last year */}
			<section className='pb-5 mt-6 space-y-6'>
				<UserAppointmentsList
					title='Available Appointments'
					appointments={availableAppointments}
				/>
				<UserAppointmentsList
					title='Booked Appointments'
					appointments={bookedAppointments}
				/>
				<UserAppointmentsList
					title='Completed Appointments'
					appointments={completedAppointments}
				/>
			</section>
		</DashboardLayout>
	)
}
