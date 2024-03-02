import { useContext } from 'react'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { DashboardLayout } from './DashboardLayout'
import { useNavigate } from "react-router-dom"
import { hours } from '../utils/hours';
import { useBarbers } from '../queries/barberQueries';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateAppointment } from '../mutations/appointmentMutations';
import { Label } from "../components/Form/Label";
import { SelectInput } from "../components/Form/SelectInput";
import { useQueryClient } from '@tanstack/react-query';

export const AdminNewAppointment = () => {
	const navigate = useNavigate();
	const { displayNotification } = useContext(NotificationContext)

	const queryClient = useQueryClient();

	const newAppointmentValidationSchema = z.object({
		barberId: z.string().min(1),
		time: z.string().min(1),
	});

	const { handleSubmit, register, formState: { errors } } = useForm({
		defaultValues: {
			barberId: "",
			time: ""
		},
		resolver: zodResolver(newAppointmentValidationSchema)
	});

	const { data: barbers, isLoading } = useBarbers();
	const { mutate: createAppointment } = useCreateAppointment();

	const submitHandler = (data) => {
		const { barberId, time } = data;

		const appointment = {
			barberId,
			time
		};

		createAppointment({
			appointment
		}, {
			onSuccess: () => {
				displayNotification('Appointment created successfully.');
				queryClient.invalidateQueries(["appointments"]);
				navigate('/appointments');
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
				console.error(error);
			}
		});
	}

	return (
		<DashboardLayout currentTab='appointments'>
			{isLoading ? (
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
								<Label value="Barber" htmlFor="barber" />
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<SelectInput
										id="barber"
										name="barberId"
										defaultOptionText="Select a barber"
										options={barbers.map(barber => ({
											text: barber.firstName + " " + barber.lastName,
											value: barber._id
										}))}
										register={register}
										errors={errors}
									/>
								</div>
							</div>
						</div>
						<div className='space-y-6 sm:space-y-5'>
							<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
								<Label value="Time" htmlFor="time" />
								<div className='mt-1 sm:mt-0 sm:col-span-2'>
									<SelectInput
										id="time"
										name="time"
										options={hours.map(hour => ({ text: hour, value: hour }))}
										defaultOptionText="Select a time"
										register={register}
										errors={errors}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<button
								onClick={() => navigate(-1)}
								type='button'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								Cancel
							</button>
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
