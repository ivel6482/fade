import Appointment from './Appointment'

export default function UserAppointmentsList({ title, appointments }) {
	console.log(appointments)
	return (
		<>
			<section className='pb-5 border-b border-gray-200'>
				<h3 className='text-lg font-semibold leading-6 text-gray-900'>
					{title}
				</h3>
			</section>
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
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{appointments.map((appointment) => (
										<tr key={appointment._id}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													{/* <div className='flex-shrink-0 w-10 h-10'>
														<img className="w-10 h-10 rounded-full" src={person.image} alt="" />
													</div> */}
													{/* <div className='ml-4'> */}
													<div className='text-sm font-medium text-gray-900'>
														{appointment.barberId.name}
													</div>
													{/* <div className="text-sm text-gray-500">{person.email}</div> */}
													{/* </div> */}
												</div>
											</td>
											{/* <td className='px-6 py-4 whitespace-nowrap'>
												<div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
											</td> */}
											<td className='px-6 py-4 whitespace-nowrap'>
												{appointment.booked ? (
													<span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
														Booked
													</span>
												) : (
													<span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
														Completed
													</span>
												)}
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{appointment.time}
											</td>
											<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
												{appointment.createdAt}
											</td>
											<td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
												<a
													href='#!'
													className='text-indigo-600 hover:text-indigo-900'
												>
													Edit
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
