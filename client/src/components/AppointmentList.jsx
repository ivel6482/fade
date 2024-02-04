import { useContext } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { FaceFrownIcon } from '@heroicons/react/24/outline'
import { Appointment } from './Appointment'

export const AppointmentList = () => {
	const { appointments } = useContext(BarbershopsContext)
	return (
		//TODO: Add skeleton loader when loading data.
		<div>
			<h2 className='mb-6 text-xl text-center text-gray-600'>
				These are my current appointments
			</h2>
			{appointments.length === 0 ? (
				<section className='flex p-3 space-x-4 font-semibold text-gray-200 bg-blue-900 rounded-md'>
					<FaceFrownIcon width='140' className='text-indigo-400' />
					<p>
						Sorry, I do not have any more appointments today. Come back
						tomorrow!
					</p>
				</section>
			) : (
				<ul className='mt-3 space-y-2'>
					{appointments.map((appointment) => (
						<Appointment key={appointment._id} appointment={appointment} />
					))}
				</ul>
			)}
		</div>
	)
}
