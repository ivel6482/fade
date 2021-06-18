/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function NewAppointment({ open, setOpen }) {
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
						<div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
								<button
									type='button'
									className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									onClick={() => setOpen(false)}
								>
									<span className='sr-only'>Close</span>
									<XIcon className='w-6 h-6' aria-hidden='true' />
								</button>
							</div>
							<div className='sm:flex sm:items-start'>
								{/* <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
									<ExclamationIcon
										className='w-6 h-6 text-red-600'
										aria-hidden='true'
									/>
								</div> */}
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
											<label
												htmlFor='time'
												className='block text-sm font-medium text-gray-700'
											>
												Time
											</label>
											<div className='mt-1'>
												<input
													type='text'
													name='time'
													id='time'
													className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
													placeholder='1:00 PM'
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
								<button
									type='button'
									className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={() => setOpen(false)}
								>
									Post
								</button>
								<button
									type='button'
									className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
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
