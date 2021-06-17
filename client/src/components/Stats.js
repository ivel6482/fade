/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'

const stats = [
	{
		name: 'Total Appointments',
		stat: '71,897',
		previousStat: '70,946',
		change: '12%',
		changeType: 'increase',
	},
	{
		name: 'Avg. Appointments Booked',
		stat: '58.16%',
		previousStat: '56.14%',
		change: '2.02%',
		changeType: 'increase',
	},
	{
		name: 'Avg. Completed',
		stat: '24.57%',
		previousStat: '28.62%',
		change: '4.05%',
		changeType: 'decrease',
	},
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Stats() {
	return (
		<>
			<div className='pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
				<h3 className='text-lg font-medium leading-6 text-gray-900'>
					Your Appointments
				</h3>
				<div className='mt-3 sm:mt-0 sm:ml-4'>
					<button
						type='button'
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						New Appointment
					</button>
				</div>
			</div>
			<div>
				<h3 className='text-lg font-medium leading-6 text-gray-900'>
					Last 30 days
				</h3>
				<dl className='grid grid-cols-1 mt-5 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow md:grid-cols-3 md:divide-y-0 md:divide-x'>
					{stats.map((item) => (
						<div key={item.name} className='px-4 py-5 sm:p-6'>
							<dt className='text-base font-normal text-gray-900'>
								{item.name}
							</dt>
							<dd className='flex items-baseline justify-between mt-1 md:block lg:flex'>
								<div className='flex items-baseline text-2xl font-bold text-indigo-600'>
									{item.stat}
									<span className='ml-2 text-sm font-semibold text-gray-500'>
										from {item.previousStat}
									</span>
								</div>

								<div
									className={classNames(
										item.changeType === 'increase'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800',
										'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-semibold md:mt-2 lg:mt-0'
									)}
								>
									{item.changeType === 'increase' ? (
										<ArrowSmUpIcon
											className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500'
											aria-hidden='true'
										/>
									) : (
										<ArrowSmDownIcon
											className='-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500'
											aria-hidden='true'
										/>
									)}

									<span className='sr-only'>
										{item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
										by
									</span>
									{item.change}
								</div>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</>
	)
}
