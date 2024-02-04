/**
 *
 * @param {Array[Object]} stats - array of object containing the properties name: string and stat: number
 */
export const Stats = ({ stats = [] }) => {
	return (
		<div className='mb-3'>
			<dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3'>
				{stats.length === 0 ? (
					<p>No stats to display</p>
				) : (
					stats.map((item) => (
						<div
							key={item.name}
							className='px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6'
						>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								{item.name}
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{item.stat}
							</dd>
						</div>
					))
				)}
			</dl>
		</div>
	)
}
