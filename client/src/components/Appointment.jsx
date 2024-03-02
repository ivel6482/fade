import { useContext } from 'react'
import { NotificationContext } from "../store/contexts/notificationsContext";
import { CalendarIcon } from '@heroicons/react/24/solid'
import { useUser } from "../store/authStore"
import { useBookAppointment } from '../mutations/appointmentMutations'
import { useQueryClient } from '@tanstack/react-query';

export const Appointment = ({ appointment }) => {
	const user = useUser();

	const queryClient = useQueryClient();

	const { displayNotification } = useContext(NotificationContext);
	const { mutate: bookAppointment } = useBookAppointment();

	const handleAppointment = (id) => {
		bookAppointment({ appointmentId: id, userId: user._id }, {
			onSuccess: () => {
				displayNotification("Appointment booked");
				queryClient.invalidateQueries(["barber-available-appointments"])
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
			}
		})
	}

	return (
		<li className='flex items-center justify-between p-3 text-gray-200 bg-blue-900 rounded-md'>
			<section className='flex space-x-2'>
				<CalendarIcon width='20' className='text-indigo-400' />
				<p>{appointment.time}</p>
			</section>
			<button
				className='px-2 py-1 text-gray-200 transition bg-blue-900 rounded-md hover:shadow-md hover:bg-white hover:text-blue-900 focus:outline-none'
				onClick={() => handleAppointment(appointment._id)}
			>
				Book Now
			</button>
		</li>
	)
}
