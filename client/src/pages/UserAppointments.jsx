import { DashboardLayout } from '../components/DashboardLayout'
import { UserAppointmentsList } from '../components/UserAppointmentsList'
import { useUser } from "../store/authStore"
import { useUserActiveAppointments, useUserCompletedAppointments } from "../queries/appointmentQueries"

export const UserAppointments = () => {
	const user = useUser();

	const { data: activeUserAppointments, isLoading: isLoadingActiveAppointments } = useUserActiveAppointments(user._id);
	const { data: completedUserAppointments, isLoading: isLoadingCompletedAppointments } = useUserCompletedAppointments(user._id);

	console.log("active", activeUserAppointments);
	console.log("completed", completedUserAppointments);

	return (
		<DashboardLayout currentTab='appointments'>
			<h2 className='text-4xl font-bold text-gray-200 lg:text-7xl'>
				Your Appointments
			</h2>
			{isLoadingActiveAppointments || isLoadingCompletedAppointments ? (
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
