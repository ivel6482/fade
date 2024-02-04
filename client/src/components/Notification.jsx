/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { NotificationContext } from '../store/contexts/notificationsContext'

export const Notification = ({ notification }) => {
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
						<div className='w-full max-w-sm overflow-hidden bg-blue-900 rounded-lg shadow-lg pointer-events-auto ring-black ring-opacity-20'>
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
											{notification.message}
										</p>
									</div>
									<div className='flex flex-shrink-0 ml-4'>
										<button
											className='inline-flex text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
											onClick={() => {
												hideNotification()
											}}
										>
											<span className='sr-only'>Close</span>
											<XMarkIcon className='w-5 h-5' aria-hidden='true' />
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
