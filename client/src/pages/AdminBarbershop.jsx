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

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

const hours = [
	'12:00 AM',
	'1:00 AM',
	'2:00 AM',
	'3:00 AM',
	'4:00 AM',
	'5:00 AM',
	'6:00 AM',
	'7:00 AM',
	'8:00 AM',
	'9:00 AM',
	'10:00 AM',
	'11:00 AM',
	'12:00 PM',
	'1:00 PM',
	'2:00 PM',
	'3:00 PM',
	'4:00 PM',
	'5:00 PM',
	'6:00 PM',
	'7:00 PM',
	'8:00 PM',
	'9:00 PM',
	'10:00 PM',
	'11:00 PM',
];

export const AdminBarbershop = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data: barbershop, isLoading } = useBarbershop(id);

	const { displayNotification } = useContext(NotificationContext)
	const { updateBarbershop, deleteBarbershop } = useContext(AdminContext)

	const updateBarbershopValidationSchema = z.object({
		name: z.string().min(1),
		about: z.string(),
		address: z.string().min(1),
		phoneNumber: z.string().min(10), // @@@TODO: Is there a phone number validation in zod?
		// openTime: z.date(), // @@@ TODO: time validator in zod
		// closeTime: z.date(), // @@@ TODO: Has to be greater than open time
		// available: z.array() // @@@ TODO: Array validator in zod
		openTime: z.string().min(1),
		closeTime: z.string().min(1),
		available: z.string().array().nonempty()
	});

	const { handleSubmit, formState: { errors }, register } = useForm({
		values: {
			name: barbershop?.name,
			about: barbershop?.about ? barbershop.about : '',
			address: barbershop?.location?.address,
			phoneNumber: barbershop?.contact?.phoneNumber,
			openTime: barbershop?.available?.hours?.open,
			closeTime: barbershop?.available?.hours?.close,
			// available: days.map((day) =>
			// 	barbershop?.available?.days.includes(day) ? true : false
			// )
			available: barbershop?.available?.days
		}
		// resolver: zodResolver(updateBarbershopValidationSchema)
	});

	const submitHandler = (data) => {
		const { name, about, address, phoneNumber, openTime, closeTime, available } = data;
		console.log(data);
		console.log(available);

		return;

		const selectedDays = days.filter((_, i) => available[i] === true)
		//TODO: Better error validation, ensure all the necessary information is provided.

		if (
			name === barbershop.name &&
			about === barbershop.about &&
			address === barbershop.location.address &&
			phoneNumber === barbershop.contact.phoneNumber &&
			openTime === barbershop.available.hours.open &&
			closeTime === barbershop.available.hours.close &&
			barbershop.available.days.toString() === selectedDays.toString()
		) {
			displayNotification('Please make changes before updating.')
		} else {
			updateBarbershop(
				id,
				{
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
						days: selectedDays,
					},
				},
				displayNotification
			)
		}
	}

	const deleteHandler = () => {
		deleteBarbershop(id, navigate)
		displayNotification('Barbershop deleted successfully.')
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
													{days.map((day, index) => (
														<div
															key={day}
															className='relative flex items-start'
														>
															<div className='flex items-center h-5'>
																<Checkbox id={day} name="available" register={register} errors={errors} />
																{/* checked={available[index]}
																	onChange={() => toggleCheckbox(index)} */}
															</div>
															<div className='ml-3 text-sm'>
																<Label value={day} htmlFor={day} />
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='country'
										className='block pt-6 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Time that your barbershop will open to the public
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										{/* <select
											id='open-time'
											name='open-time'
											autoComplete='open-time'
											value={openTime}
											onChange={(e) => setOpenTime(e.target.value)}
											required
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
										>
											<option value=''>Select open time</option>
											{hours.map((hour) => (
												<option key={hour} value={hour}>
													{hour}
												</option>
											))}
										</select> */}
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='close-time'
										className='block pt-6 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Time that your barbershop will close to the public
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										{/* <select
											id='close-time'
											name='close-time'
											autoComplete='close-time'
											value={closeTime}
											onChange={(e) => setCloseTime(e.target.value)}
											required
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:max-w-xs sm:text-sm'
										>
											<option value=''>Select close time</option>
											{hours.map((hour) => (
												<option key={hour} value={hour}>
													{hour}
												</option>
											))}
										</select> */}
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
