import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { DashboardLayout } from './DashboardLayout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBarberAvailableAppointments, useBarbers } from '../queries/barberQueries'
import { useUsers } from '../queries/userQueries'
import { useBookAppointment } from '../mutations/appointmentMutations'
import { Label } from "../components/Form/Label";
import { SelectInput } from "../components/Form/SelectInput";

export const AdminBookAppointment = () => {
	const navigate = useNavigate();
	const { displayNotification } = useContext(NotificationContext)

	const bookAppointmentValidationSchema = z.object({
		barberId: z.string().min(1),
		userId: z.string().min(1),
		appointmentId: z.string().min(1)
	});

	const { handleSubmit, register, formState: { errors }, watch } = useForm({
		defaultValues: {
			barberId: "",
			userId: "",
			appointmentId: ""
		},
		resolver: zodResolver(bookAppointmentValidationSchema)
	});

	const barberId = watch("barberId");

	const { data: barbers, isPending: isBarbersLoading } = useBarbers();
	const { data: users, isPending: isUsersLoading } = useUsers();
	const { data: barberAppointments, isPending: isBarberAppointmentsLoading } = useBarberAvailableAppointments(barberId);
	const { mutate: bookAppointment } = useBookAppointment();

	const submitHandler = (data) => {
		const { userId, appointmentId } = data; // TODO: Pa que es el barberId

		bookAppointment({
			appointmentId,
			userId
		}, {
			onSuccess: () => {
				displayNotification('Appointment booked successfully.');
				navigate('/appointments')
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
			}
		});
	}

	//TODO: Add date picker for appointments, can only select from the current day to future days.

	return (
		<DashboardLayout currentTab='appointments'>
			{isBarbersLoading || isUsersLoading ? (
				<p>Loading...</p>
			) : (
				<form
					onSubmit={handleSubmit(submitHandler)}
					className='space-y-8 divide-y divide-gray-200'
				>
					<div className='space-y-8 sm:space-y-5'>
						<div>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									New Appointment
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									Create an appointment for a specific barber
								</p>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<Label value="Barber" htmlFor="barberId" />
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<SelectInput
										register={register}
										errors={errors}
										id="barberId"
										name="barberId"
										defaultOptionText="Select a barber"
										options={barbers.map(barber => ({ text: barber.firstName + " " + barber.lastName, value: barber._id }))}
									/>
								</div>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<Label value="Available Appointments" htmlFor="appointmentId" />
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									{barberAppointments?.length > 0 && (
										<SelectInput
											register={register}
											errors={errors}
											id="appointmentId"
											name="appointmentId"
											defaultOptionText="Select an appointment"
											options={barberAppointments.map(appointment => ({ text: appointment.time, value: appointment._id }))}
										/>
									)}
									{!barberId && <p>Select a barber above</p>}
									{barberId && barberAppointments?.length === 0 && <p>No appointments available</p>}
								</div>
							</div>
						</div>

						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<Label value="User" htmlFor="userId" />
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<SelectInput
										register={register}
										errors={errors}
										id="userId"
										name="userId"
										defaultOptionText="Select a user"
										options={users.map(user => ({ text: user.firstName + " " + user.lastName, value: user._id }))}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<Link
								to='/appointments'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</DashboardLayout>
	)
}
