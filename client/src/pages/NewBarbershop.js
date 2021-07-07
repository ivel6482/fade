import { useContext, useEffect, useState, Fragment } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'

//TODO: Change ids, values, names, labels

export default function NewBarbershop() {
	const history = useHistory()
	const { loading, getUsers, users, createBarbershop } =
		useContext(AdminContext)
	const { displayNotification } = useContext(NotificationContext)
	const { token } = useContext(UserContext)
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

	const [available, setAvailable] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
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
		getUsers()
	}, [])

	const toggleCheckbox = (index) => {
		setAvailable(
			available.map((checked, i) => (i === index ? !checked : checked))
		)
	}

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (
			name === '' ||
			about === '' ||
			address === '' ||
			phoneNumber === '' ||
			openTime === '' ||
			closeTime === '' ||
			barbershopOwner === ''
		) {
			displayNotification('Please completely fill the form.')
		} else {
			const selectedDays = days.filter((_, i) => available[i] === true)
			createBarbershop(
				{
					name,
					about,
					location: {
						address,
					},
					contact: {
						phoneNumber,
					},
					barbershopOwner: barbershopOwner._id,
					available: {
						hours: {
							open: openTime,
							close: closeTime,
						},
						days: selectedDays,
					},
				},
				token,
				history
			)
		}
	}

	return (
		<DashboardLayout>
			{loading ? (
				<p>Loading...</p>
			) : (
				<form
					onSubmit={submitHandler}
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
									<Listbox
										value={barbershopOwner}
										onChange={setBarbershopOwner}
									>
										{({ open }) => (
											<>
												<Listbox.Label className='block text-sm font-medium text-gray-700'>
													Owner
												</Listbox.Label>
												<div className='relative mt-1'>
													<Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
														<span className='block truncate'>
															{barbershopOwner === '' && 'Select an owner'}
															{barbershopOwner !== '' &&
																barbershopOwner.firstName +
																	' ' +
																	barbershopOwner.lastName}
														</span>
														<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
															<SelectorIcon
																className='w-5 h-5 text-gray-400'
																aria-hidden='true'
															/>
														</span>
													</Listbox.Button>

													<Transition
														show={open}
														as={Fragment}
														leave='transition ease-in duration-100'
														leaveFrom='opacity-100'
														leaveTo='opacity-0'
													>
														<Listbox.Options
															static
															className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
														>
															{users.map((user) => (
																<Listbox.Option
																	key={user._id}
																	className={({ active }) =>
																		classNames(
																			active
																				? 'text-white bg-indigo-600'
																				: 'text-gray-900',
																			'cursor-default select-none relative py-2 pl-3 pr-9'
																		)
																	}
																	value={user}
																>
																	{({ barbershopOwner, active }) => (
																		<>
																			<span
																				className={classNames(
																					barbershopOwner
																						? 'font-semibold'
																						: 'font-normal',
																					'block truncate'
																				)}
																			>
																				{user.firstName} {user.lastName}
																			</span>

																			{barbershopOwner ? (
																				<span
																					className={classNames(
																						active
																							? 'text-white'
																							: 'text-indigo-600',
																						'absolute inset-y-0 right-0 flex items-center pr-4'
																					)}
																				>
																					<CheckIcon
																						className='w-5 h-5'
																						aria-hidden='true'
																					/>
																				</span>
																			) : null}
																		</>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</>
										)}
									</Listbox>
								</div>
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
												<option value={hour}>{hour}</option>
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
