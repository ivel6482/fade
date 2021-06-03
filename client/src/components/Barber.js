import { useState } from 'react'
import { CalendarIcon } from '@heroicons/react/solid'
import Modal from './Modal'

export default function Barber({ barber }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			{open && <Modal open={open} setOpen={setOpen} />}
			<li className='flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow'>
				<div className='flex flex-col flex-1 p-8'>
					<img
						className='flex-shrink-0 w-32 h-32 mx-auto bg-black rounded-full'
						src={barber.imageUrl}
						alt=''
					/>
					<h3 className='mt-6 text-sm font-medium text-gray-900'>
						{barber.name}
					</h3>
					<dl className='flex flex-col justify-between flex-grow mt-1'>
						<dt className='sr-only'>Title</dt>
						<dd className='text-sm text-gray-500'>{barber.title}</dd>
						<dt className='sr-only'>Role</dt>
						<dd className='mt-3'>
							{barber.specialties.map((specialty, index) => (
								//TODO: use uuid for key instead of index, implement this in the database model and controller.
								<span
									key={index}
									className='px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full'
								>
									{specialty}
								</span>
							))}
						</dd>
					</dl>
				</div>
				<div>
					<div className='flex -mt-px divide-x divide-gray-200'>
						{/* //TODO: When this is clicked show a modal with the appointments. */}
						<div className='flex flex-1 w-0 transition hover:bg-gray-50'>
							<button
								onClick={() => setOpen(true)}
								className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'
							>
								<CalendarIcon
									className='w-5 h-5 text-gray-400'
									aria-hidden='true'
								/>
								<span className='ml-3'>Book Appointment</span>
							</button>
						</div>
					</div>
				</div>
			</li>
		</>
	)
}
