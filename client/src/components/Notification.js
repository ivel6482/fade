/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { NotificationContext } from '../store/contexts/notificationsContext'

export default function Notification() {
	const { show, hideNotification } = useContext(NotificationContext)

	//TODO: Map through notifications. Where can I map through notifications
	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live='assertive'
				className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
			>
				<div className='flex flex-col items-center w-full space-y-4 sm:items-end'>
					{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
					<Transition
						show={show}
						as={Fragment}
						enter='transform ease-out duration-300 transition'
						enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
						enterTo='translate-y-0 opacity-100 sm:translate-x-0'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto bg-gradient-to-r from-green-400 to-blue-500 ring-1 ring-black ring-opacity-20'>
							<div className='p-4'>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>
										<CheckCircleIcon
											className='w-6 h-6 text-white'
											aria-hidden='true'
										/>
									</div>
									<div className='ml-3 w-0 flex-1 pt-0.5'>
										<p className='text-lg font-semibold text-white'>
											Successfully saved!
										</p>
										{/* <p className='mt-1 text-sm text-white'>
											Anyone with a link can now view this file.
										</p> */}
									</div>
									<div className='flex flex-shrink-0 ml-4'>
										<button
											className='inline-flex text-white rounded-md hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
											onClick={() => {
												hideNotification()
											}}
										>
											<span className='sr-only'>Close</span>
											<XIcon className='w-5 h-5' aria-hidden='true' />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
