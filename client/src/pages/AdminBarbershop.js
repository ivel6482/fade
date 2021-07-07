import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { AdminContext } from '../store/contexts/adminContext'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { NotificationContext } from '../store/contexts/notificationsContext'

//TODO: Change ids, values, names, labels

export default function AdminBarbershop() {
	const { id } = useParams()
	const { displayNotification } = useContext(NotificationContext)
	const { updateBarbershop } = useContext(AdminContext)
	const { barbershop, getBarbershop, loading } = useContext(BarbershopsContext)
	const [name, setName] = useState('')
	const [about, setAbout] = useState('') //TODO: Add an about to the barbershop model.
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [openTime, setOpenTime] = useState('')
	const [closeTime, setCloseTime] = useState('')
	const [barbershopOwner, setBarbershopOwner] = useState('')

	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]

	// const [available, setAvailable] = useState(new Array(days.length).fill(false)) // TODO:this can be checkboxes with each day of week, is this an array?
	const [available, setAvailable] = useState([
		false,
		false,
		false,
		false,
		false,
		true,
		false,
	])

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
	]

	useEffect(() => {
		getBarbershop(id)

		return () => {
			setName('')
			setAbout('')
			setAddress('')
			setBarbershopOwner('')
			setAvailable([false, false, false, false, false, false, false])
			setCloseTime('')
			setOpenTime('')
			setPhoneNumber('')
		}
	}, [])

	useEffect(() => {
		setName(barbershop?.name)
		setAbout(barbershop?.about)
		setAddress(barbershop?.location?.address)
		setPhoneNumber(barbershop?.contact?.phoneNumber)
		setOpenTime(barbershop?.available?.hours?.open)
		setCloseTime(barbershop?.available?.hours?.close)
		setAvailable(
			days.map((day) =>
				barbershop?.available?.days.includes(day) ? true : false
			)
		)
	}, [barbershop])

	const toggleCheckbox = (index) => {
		setAvailable(
			available.map((checked, i) => (i === index ? !checked : checked))
		)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const selectedDays = days.filter((_, i) => available[i] === true)
		updateBarbershop(id, {
			name,
			about,
			location: {
				address,
			},
			contact: {
				phoneNumber,
			},
			// barbershopOwner: barbershopOwner._id,
			available: {
				hours: {
					open: openTime,
					close: closeTime,
				},
				days: selectedDays,
			},
		})
		displayNotification('Barbershop updated successfully!')
	}

	const deleteHandler = () => {
		displayNotification('Barbershop deleted successfully.')
	}

	return (
		<DashboardLayout>
			{loading && barbershop === null ? (
				<p>Loading barbershop...</p>
			) : (
				<form
					onSubmit={submitHandler}
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
										className='inline-flex items-center px-3 py-2 text-sm font-semibold leading-4 text-white bg-gray-400 border border-transparent rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
									>
										Delete
									</button>
								</div>
							</div>

							<div className='mt-6 space-y-6 sm:mt-5 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='username'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Name
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex max-w-lg rounded-md shadow-sm'>
											<input
												type='text'
												name='name'
												id='name'
												value={name}
												onChange={(e) => setName(e.target.value)}
												autoComplete='name'
												className='flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
										</div>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='about'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										About
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<textarea
											id='about'
											name='about'
											rows={3}
											className='block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											value={about}
											onChange={(e) => setAbout(e.target.value)}
										/>
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
									<label
										htmlFor='first_name'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Address
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<input
											type='text'
											name='address'
											id='address'
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											autoComplete='address'
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										/>
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
									<label
										htmlFor='first_name'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Phone Number
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<input
											type='text'
											name='address'
											id='address'
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											autoComplete='address'
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										/>
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
											{/* //TODO: how to prefill the checkboxes? will the values be and array? */}
											<div className='mt-4 space-y-3 sm:mt-0 sm:col-span-2'>
												<div className='max-w-lg space-y-4'>
													{days.map((day, index) => (
														<div
															key={day}
															className='relative flex items-start'
														>
															<div className='flex items-center h-5'>
																<input
																	id={day}
																	name={day}
																	type='checkbox'
																	value={day}
																	className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
																	checked={available[index]}
																	onChange={() => toggleCheckbox(index)}
																/>
															</div>
															<div className='ml-3 text-sm'>
																<label
																	htmlFor={day}
																	className='font-medium text-gray-700'
																>
																	{day}
																</label>
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
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Time that your barbershop will open to the public
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<select
											id='open-time'
											name='open-time'
											autoComplete='open-time'
											value={openTime}
											onChange={(e) => setOpenTime(e.target.value)}
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										>
											{hours.map((hour) => (
												<option key={hour} value={hour}>
													{hour}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='close-time'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Time that your barbershop will close to the public
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<select
											id='close-time'
											name='close-time'
											autoComplete='close-time'
											value={closeTime}
											onChange={(e) => setCloseTime(e.target.value)}
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										>
											{hours.map((hour) => (
												<option key={hour} value={hour}>
													{hour}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5 pb-5'>
						<div className='flex justify-end'>
							<Link
								to='/dashboard'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
