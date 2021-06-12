import AppointmentRow from './AppointmentRow'

export default function UserAppointmentsList({ title, appointments }) {
	// TODO: Implement a button to cancel the appointment on the My Appointments page, this button will only appear for appointments that have the status of `booked` or `booked: true`. When the button is pressed a modal should show with a dialog to the user to confirm their choice.

	return (
		<>
			<section className='pb-5 border-b border-gray-200'>
				<h3 className='text-lg font-semibold leading-6 text-gray-900'>
					{title}
				</h3>
			</section>
			{appointments.length === 0 ? (
				<p className='font-semibold text-gray-400'>
					The are currently no {title.toLowerCase()} appointments.
				</p>
			) : (
				<div className='flex flex-col'>
					<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
							<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
											>
												Barber Name
											</th>
											{/* <th
											scope='col'
											className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
										>
											Title
										</th> */}
											<th
												scope='col'
												className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
											>
												Status
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
											>
												Time
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
											>
												Date
											</th>
											<th scope='col' className='relative px-6 py-3'>
												<span className='sr-only'>Cancel</span>
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200 '>
										{appointments.map((appointment) => (
											<AppointmentRow
												key={appointment._id}
												appointment={appointment}
											/>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
