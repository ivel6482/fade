import Appointment from './Appointment'

export default function UserAppointmentsList({ title, appointments }) {
	return (
		<>
			<section className='pb-5 border-b border-gray-200'>
				<h3 className='text-lg font-semibold leading-6 text-gray-900'>
					{title}
				</h3>
			</section>
			<div className='overflow-hidden bg-white rounded-md shadow'>
				<ul className='space-y-3 divide-y divide-gray-200'>
					{appointments.map((appointment) => (
						<li key={appointment._id} className='px-6 py-4'>
							<Appointment appointment={appointment} />
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
