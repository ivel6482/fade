import { CalendarIcon } from '@heroicons/react/solid'

export default function Appointment({ appointment }) {
	return (
		<li className='flex items-center justify-between p-3 text-indigo-600 bg-indigo-100 border border-indigo-100 rounded-md hover:border-indigo-400'>
			<section className='flex space-x-2'>
				<CalendarIcon width='20' className='text-indigo-400' />
				<p>{appointment.time}</p>
			</section>
			<button className='px-2 py-1 text-white transition bg-indigo-500 rounded-md hover:shadow-md hover:bg-indigo-600'>
				Book Now
			</button>
		</li>
	)
}
