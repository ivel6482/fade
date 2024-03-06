import { Fragment, useContext, useState } from 'react'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Dialog, Transition } from '@headlessui/react'
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { useUser } from "../store/authStore"
import { useCreateAppointment } from "../mutations/barberMutations"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../components/Form/Label";
import { SelectInput } from "../components/Form/SelectInput";
import { TextInput } from "../components/Form/TextInput";

export const NewAppointment = ({ open, setOpen }) => {
	const user = useUser();
	const queryClient = useQueryClient();
	const { displayNotification } = useContext(NotificationContext)

	const { mutate: createAppointment, isPending: isCreatingAppointment } = useCreateAppointment();

	const createAppointmentValidationSchema = z.object({
		hour: z.string().min(1).regex(/^(1[012]|[1-9]):([0-5]{1}[0-9]{1})$/),
		time: z.string().min(1)
	});

	const { handleSubmit, register, formState: { errors } } = useForm({
		defaultValues: {
			hour: "",
			time: "AM",
		},
		resolver: zodResolver(createAppointmentValidationSchema)
	});

	// * FIXME: Barbers are not currently accounts that can log in, add a barbershop field to the user model and set it to null by default, check if the role is barber then we can modify barbershop field.
	//   TODO: Make a route to get barbers, this has to be changed from getting barbers collection to use the user collection and filter by role: 'barber' instead.
	const newAppointmentHandler = (data) => {
		const { hour, time } = data;

		if (user.role === 'barber') {
			const newAppointment = `${hour} ${time}`

			createAppointment({ time: newAppointment, barberId: user._id }, {
				onSuccess: () => {
					displayNotification('Appointment created successfully.')
					queryClient.invalidateQueries(["user-active-appointments"]);
					queryClient.invalidateQueries(["barber-available-appointments"]);
					setOpen(false);
				},
				onError: (error) => {
					console.error(error);
					displayNotification(error.response.data.message)
				}
			});
		}
	}

	//TODO: Maybe change time input from text to select with options from 1,2,3,... and another PM or AM
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as='div'
				static
				className='fixed inset-0 z-10 overflow-y-auto'
				open={open}
				onClose={setOpen}
			>
				<div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-xs sm:w-full sm:p-6'>
							<div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
								<button
									type='button'
									className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
									onClick={() => setOpen(false)}
								>
									<span className='sr-only'>Close</span>
									<XMarkIcon className='w-6 h-6' aria-hidden='true' />
								</button>
							</div>
							<div className='sm:flex sm:items-start'>
								<div className='mt-3 text-center sm:mt-0 sm:text-left'>
									<Dialog.Title
										as='h3'
										className='text-lg font-semibold leading-6 text-gray-900'
									>
										New Appointment
									</Dialog.Title>
									<div className='mt-2'>
										{/* Content */}
										<div>
											<Label value="Hour" htmlFor="hour" />
											<div className='relative mt-1 rounded-md shadow-sm'>
												<TextInput register={register} name="hour" />
												<div className='absolute inset-y-0 right-0 flex items-center'>
													<label htmlFor='time' className='sr-only'>
														Time
													</label>
													<select
														name='time'
														{...register}
														className='h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm'
													>
														<option value='AM'>AM</option>
														<option value='PM'>PM</option>
													</select>
												</div>
											</div>

											{(errors.hour || errors.time) && (
												<small>
													<div className='flex items-center my-2 font-semibold text-red-600'>
														<ExclamationTriangleIcon className='w-4 h-4 mr-1' />
														<span>Time is invalid</span>
													</div>
												</small>
											)}

											<small className='block text-sm text-gray-400 sm:w-3/4'>
												Time must be in 12-Hour format. Example: 1:00 PM
											</small>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
								<button
									type='button'
									className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={handleSubmit((data) => newAppointmentHandler(data))}
								>
									{isCreatingAppointment ? "Creating..." : "Create"}
								</button>
								<button
									type='button'
									className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm'
									onClick={() => setOpen(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
