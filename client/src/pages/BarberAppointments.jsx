import { DashboardLayout } from '../components/DashboardLayout'
import { AppointmentsList } from '../components/AppointmentsList'
import { PageHeaderWithButton } from '../components/PageHeaderWithButton'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { NewAppointment } from '../components/NewAppointment'
import { useUser } from "../store/authStore"
import { useBarberAvailableAppointments, useBarberBookedAppointments, useBarberCompletedAppointments } from "../queries/barberQueries"

export const BarberAppointments = () => {
	const [open, setOpen] = useState(false)
	const user = useUser();

	const { data: availableAppointments, isLoading: isLoadingAvailableAppointments } = useBarberAvailableAppointments(user._id);
	const { data: bookedAppointments, isLoading: isLoadingBookedAppointments } = useBarberBookedAppointments(user._id);
	const { data: completedAppointments, isLoading: isLoadingCompletedAppointments } = useBarberCompletedAppointments(user._id);

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
			{/* //TODO: Rename UserAppointmentsList to something more generic for reusability. */}
			{/* //TODO: Implement a filter to filter appointments by today, this week, this month, last 6 months, last year */}
			<section className='pb-5 mt-6 space-y-6'>
				{!isLoadingAvailableAppointments && (
					<AppointmentsList
						title='Available Appointments'
						appointments={availableAppointments}
					/>
				)}
				{!isLoadingBookedAppointments && (
					<AppointmentsList
						title='Booked Appointments'
						appointments={bookedAppointments}
					/>
				)}
				{!isLoadingCompletedAppointments && (
					<AppointmentsList
						title='Completed Appointments'
						appointments={completedAppointments}
					/>
				)}
			</section>
		</DashboardLayout>
	)
}
