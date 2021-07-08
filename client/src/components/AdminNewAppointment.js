/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AdminContext } from '../store/contexts/adminContext'

export default function AdminNewAppointment({ open, setOpen }) {
	const { loading, barbers, getBarbers } = useContext(AdminContext)

	useEffect(() => {
		//FIXME: Why does this prevent the modal from opening and triggering a loading on the appointments component.
		// getBarbers()
	}, [])

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
						<div className='inline-block w-full px-4 pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
							<div>
								<form>
									<h3>Book new appointment</h3>
									<div>
										{/* select for barbers 
                    when grab the appointments from selected
										barber select a user to book the appointment for */}
										<div>
											<label
												htmlFor='location'
												className='block text-sm font-medium text-gray-700'
											>
												Location
											</label>
											<select
												id='barber'
												name='barber'
												className='block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
												defaultValue='Select a barber'
											>
												{barbers.map((barber) => (
													<option key={barber._id} value={barber._id}>
														{barber.firstName} {barber.lastName}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className='flex gap-2 mt-5 sm:mt-6'>
										<button
											type='button'
											className='w-1/2 px-4 py-2 text-base font-semibold text-indigo-500 border border-indigo-500 rounded-md shadow-sm hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
											onClick={() => setOpen(false)}
										>
											Cancel
										</button>
										<button
											type='submit'
											className='w-1/2 px-4 py-2 text-base font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
											onClick={() => alert('Booked')}
										>
											Book
										</button>
									</div>
								</form>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
