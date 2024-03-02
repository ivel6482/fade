import { useState, useContext } from 'react'
import { CalendarIcon } from '@heroicons/react/24/solid'
import { Modal } from './Modal'
import { useBarberAvailableAppointments } from '../queries/barberQueries'

export const Barber = ({ barber }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && <Modal open={open} setOpen={setOpen} barberId={barber._id} />}
			<li className='flex flex-col col-span-1 overflow-hidden text-center bg-white divide-y divide-gray-200 rounded-lg shadow'>
				<div className='flex flex-col flex-1 p-8'>
					<img
						className='flex-shrink-0 w-32 h-32 mx-auto bg-black rounded-full'
						src='https://source.unsplash.com/random'
						alt=''
					/>
					<h3 className='mt-6 text-sm font-medium text-gray-900'>
						{barber.firstName} {barber.lastName}
					</h3>
					<dl className='flex flex-col justify-between flex-grow mt-1'>
						<dt className='sr-only'>Title</dt>
						<dd className='text-sm text-gray-500'>{barber.title}</dd>
						<dt className='sr-only'>Role</dt>
						<dd className='mt-3'>
						</dd>
					</dl>
				</div>
				<div>
					<div className='flex -mt-px divide-x divide-gray-200'>
						<div className='flex flex-1 w-0 transition group hover:bg-blue-900 hover:text-gray-200'>
							<button
								onClick={() => setOpen(true)}
								className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium border border-transparent rounded-bl-lg '
							>
								<CalendarIcon
									className='w-5 h-5 group-hover:text-indigo-400'
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
