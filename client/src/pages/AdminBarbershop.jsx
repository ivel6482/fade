import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '../components/DashboardLayout'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { useBarbershop } from '../queries/barbershopQueries'
import { useForm } from "react-hook-form";
import { Label } from "../components/Form/Label";
import { TextInput } from "../components/Form/TextInput";
import { TextAreaInput } from '../components/Form/TextAreaInput';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from '../components/Form/Checkbox'
import { SelectInput } from '../components/Form/SelectInput'
import { useUpdateBarbershop, useDeleteBarbershop } from "../mutations/barbershopMutations";
import { days } from '../utils/days';
import { hours } from '../utils/hours';

const hoursOptions = hours.map(hour => ({ text: hour, value: hour }));

export const AdminBarbershop = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data: barbershop, isLoading } = useBarbershop(id);

	const { displayNotification } = useContext(NotificationContext)

	const updateBarbershopValidationSchema = z.object({
		name: z.string().min(1, { message: "Required" }),
		about: z.string(),
		address: z.string().min(1, { message: "Required " }),
		phoneNumber: z.string().min(10, { message: "Required" }), // @@@TODO: Is there a phone number validation in zod?
		// openTime: z.date(), // @@@ TODO: time validator in zod
		// closeTime: z.date(), // @@@ TODO: Has to be greater than open time
		// available: z.array() // @@@ TODO: Array validator in zod
		openTime: z.string().min(1, { message: "Required" }),
		closeTime: z.string().min(1, { message: "Required" }),
		operationDays: z.string().array().nonempty({ message: "Must select at least one day" })
	});

	const { handleSubmit, formState: { errors, isDirty }, register } = useForm({
		values: {
			name: barbershop?.name,
			about: barbershop?.about ? barbershop.about : '',
			address: barbershop?.location?.address,
			phoneNumber: barbershop?.contact?.phoneNumber,
			openTime: barbershop?.available?.hours?.open,
			closeTime: barbershop?.available?.hours?.close,
			operationDays: barbershop?.available?.days
		},
		resolver: zodResolver(updateBarbershopValidationSchema)
	});

	const { mutate: updateBarbershop } = useUpdateBarbershop();
	const { mutate: deleteAppointment } = useDeleteBarbershop();

	const submitHandler = (data) => {
		const { name, about, address, phoneNumber, openTime, closeTime, operationDays } = data;

		if (!isDirty) {
			displayNotification('Please make changes before updating.')
		} else {
			const updatedBarbershop = {
				name,
				about,
				location: {
					address,
				},
				contact: {
					phoneNumber,
				},
				available: {
					hours: {
						open: openTime,
						close: closeTime,
					},
					days: operationDays
				},

			}

			updateBarbershop({
				id,
				barbershop: updatedBarbershop
			}, {
				onSuccess: () => {
					displayNotification('Barbershop updated successfully.')
				},
				onError: (error) => {
					displayNotification(error.response.data.message)
					console.error(error);
				}
			});
		}
	}

	const deleteHandler = () => {
		// @@@ TODO: Add confirmation modal to delete barbershop that requires the admin to type the barbershop name.
		deleteAppointment({
			id
		}, {
			onSuccess: () => {
				displayNotification('Barbershop deleted successfully.');
				navigate('/dashboard');
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
				console.error(error);
			}
		});
	}

	return (
		<DashboardLayout>
			{isLoading && barbershop === null ? (
				<p>Loading barbershop...</p>
			) : (
				<form
					onSubmit={handleSubmit(submitHandler)}
					className='space-y-8 divide-y divide-gray-200'
				>
					<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
						<div>
							<div className='flex flex-col justify-between sm:flex-row'>
								<div>
									<h3 className='text-lg font-medium leading-6 text-gray-900'>
										Barbershop
									</h3>
									<p className='max-w-2xl mt-1 text-sm text-gray-500'>
										This information will be displayed publicly so be careful
										what you share.
									</p>
								</div>
								<div className='flex justify-end mt-3'>
									<button
										onClick={deleteHandler}
										type='button'
										className='inline-flex items-center px-3 py-2 text-sm font-semibold leading-4 text-gray-400 bg-white border border-gray-400 rounded-md shadow-sm rounde hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
									>
										Delete
									</button>
								</div>
							</div>

							<div className='mt-6 space-y-6 sm:mt-5 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Name" htmlFor="name" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex max-w-lg rounded-md shadow-sm'>
											<TextInput name="name" register={register} errors={errors} />
										</div>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="About" htmlFor="about" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className="max-w-lg">
											<TextAreaInput name="about" register={register} errors={errors} />
											<small className='mt-2 text-sm text-gray-500'>
												Write a few sentences about your business.
											</small>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Location
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									Use a permanent address where you can receive mail.
								</p>
							</div>
							<div className='space-y-6 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Address" htmlFor="address" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex max-w-lg rounded-md shadow-sm'>
											<TextInput name="address" register={register} errors={errors} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Contact
								</h3>
							</div>
							<div className='space-y-6 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Phone number" htmlFor="phoneNumber" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex max-w-lg rounded-md shadow-sm'>
											<TextInput name="phoneNumber" register={register} errors={errors} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-8 space-y-6 divide-y divide-gray-200 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Availability
								</h3>
							</div>
							<div className='space-y-6 divide-y divide-gray-200 sm:space-y-5'>
								<div className='pt-6 sm:pt-5'>
									<div role='group' aria-labelledby='label-email'>
										<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
											<div>
												<div
													className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
													id='label-email'
												>
													What days of the week will you the open to the public?
												</div>
											</div>
											<div className='mt-4 space-y-3 sm:mt-0 sm:col-span-2'>
												<div className='max-w-lg space-y-4'>
													{days.map((day) => (
														<div
															key={day}
															className='relative flex items-start'
														>
															<div className='flex items-center h-5'>
																<Checkbox id={day} name="operationDays" register={register} errors={errors} value={day} />
															</div>
															<div className='ml-3 text-sm'>
																<Label value={day} htmlFor={day} />
															</div>
														</div>
													))}
												</div>
												{errors["available"]?.message && <small className="text-red-500">{errors["available"]?.message}</small>}
											</div>
										</div>
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Time that your barbershop will open to the public" htmlFor="openTime" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<SelectInput id="openTime" name="openTime" register={register} errors={errors} defaultOptionText="Select open time" defaultOptionValue="" options={hoursOptions} />
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Time that your barbershop will close to the public" htmlFor="closeTime" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<SelectInput id="closeTime" name="closeTime" register={register} errors={errors} defaultOptionText="Select close time" defaultOptionValue="" options={hoursOptions} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5 pb-5'>
						<div className='flex justify-end'>
							<Link
								to='/dashboard'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
								disabled={!isDirty}
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
