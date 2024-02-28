import { useContext } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { useNavigate } from 'react-router-dom'
import { days } from '../utils/days';
import { hours } from '../utils/hours';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUsers } from '../queries/userQueries'
import { useCreateBarbershop } from '../mutations/barbershopMutations'
import { Label } from '../components/Form/Label'
import { TextInput } from '../components/Form/TextInput'
import { TextAreaInput } from '../components/Form/TextAreaInput'
import { Checkbox } from '../components/Form/Checkbox';
import { SelectInput } from '../components/Form/SelectInput';
import { Link } from 'react-router-dom';

export const NewBarbershop = () => {
	const navigate = useNavigate()
	const { displayNotification } = useContext(NotificationContext)

	const hoursOptions = hours.map(hour => ({ text: hour, value: hour }));

	const createBarbershopValidationSchema = z.object({
		name: z.string().min(1, { message: "Required" }),
		about: z.string(),
		address: z.string().min(1, { message: "Required " }),
		phoneNumber: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, { message: "Must be a valid phone number format." }),
		// openTime: z.date(), // @@@ TODO: time validator in zod
		// closeTime: z.date(), // @@@ TODO: Has to be greater than open time
		// available: z.array() // @@@ TODO: Array validator in zod
		openTime: z.string().min(1, { message: "Required" }),
		closeTime: z.string().min(1, { message: "Required" }),
		operationDays: z.string().array().nonempty({ message: "Must select at least one day" }),
		barbershopOwner: z.string().min(1, { message: "Required" })
	});

	const { handleSubmit, formState: { errors }, register } = useForm({
		defaultValues: {
			name: "",
			about: "",
			address: "",
			phoneNumber: "",
			openTime: "",
			closeTime: "",
			operationDays: [],
			barbershopOwner: ""
		},
		resolver: zodResolver(createBarbershopValidationSchema)
	});

	const { data: users, isLoading } =
		useUsers((user) => ({ text: user.firstName + " " + user.lastName, value: user._id }));

	const { mutate: createBarbershop } = useCreateBarbershop();

	const submitHandler = (data) => {
		const { name, about, address, phoneNumber, openTime, closeTime, barbershopOwner, operationDays } = data;

		const barbershop = {
			name,
			about,
			location: {
				address,
			},
			contact: {
				phoneNumber,
			},
			barbershopOwner,
			available: {
				hours: {
					open: openTime,
					close: closeTime,
				},
				days: operationDays
			},
		}

		createBarbershop({
			barbershop
		}, {
			onSuccess: (data) => {
				navigate(`/barbershops/${data.barbershop._id}`);
				displayNotification("Barbershop created.");
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
				console.error(error);
			}
		});
	}

	return (
		<DashboardLayout>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<form
					onSubmit={handleSubmit(submitHandler)}
					className='space-y-8 divide-y divide-gray-200'
				>
					<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
						<div>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									New Barbershop
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									This information will be displayed publicly so be careful what
									you share.
								</p>
							</div>

							<div className='mt-6 space-y-6 sm:mt-5 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Owner" htmlFor="barbershopOwner" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='max-w-lg rounded-md shadow-sm'>
											<SelectInput id="barbershopOwner" name="barbershopOwner" register={register} errors={errors} defaultOptionText="Select owner" defaultOptionValue="" options={users} />
										</div>
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="Name" htmlFor="name" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='max-w-lg rounded-md shadow-sm'>
											<TextInput name="name" register={register} errors={errors} />
										</div>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<Label value="About" htmlFor="about" />
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<TextAreaInput name="about" register={register} errors={errors} />
										<p className='mt-2 text-sm text-gray-500'>
											Write a few sentences about your business.
										</p>
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
										<TextInput name="address" register={register} errors={errors} />
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
										<TextInput name="phoneNumber" register={register} errors={errors} />
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
													{errors["operationDays"]?.message && <small className="text-red-500">{errors["operationDays"]?.message}</small>}
												</div>
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
