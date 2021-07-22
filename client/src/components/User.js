import { Link } from 'react-router-dom'
import SquareBadge from './SquareBadge'

export default function User({ user }) {
	return (
		<li className='flex flex-col col-span-1 overflow-hidden text-center bg-white divide-y divide-gray-200 rounded-lg shadow'>
			<div className='flex flex-col flex-1 p-8'>
				<img
					className='flex-shrink-0 w-32 h-32 mx-auto bg-black rounded-full'
					src={user.avatar}
					alt='avatar'
				/>
				<h3 className='mt-6 text-sm font-medium text-gray-900'>
					{user.firstName} {user.lastName}
				</h3>
				<div className='mt-2'>
					{user.role === 'admin' && (
						<SquareBadge color='red' text={user.role} />
					)}
					{user.role === 'barber' && (
						<SquareBadge color='green' text={user.role} />
					)}
					{user.role === 'costumer' && (
						<SquareBadge color='yellow' text={user.role} />
					)}
				</div>
				<dl className='flex flex-col justify-between flex-grow mt-1'>
					{/* <dt className='sr-only'>Title</dt>
          <dd className='text-sm text-gray-500'>{.title}</dd>
          <dt className='sr-only'>Role</dt> */}
					{/* <dd className='mt-3'>
            {barber.specialties.map((specialty, index) => (
              //TODO: use uuid for key instead of index, implement this in the database model and controller.
              <span
                key={index}
                className='px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full'
              >
                {specialty}
              </span>
            ))}
          </dd> */}
				</dl>
			</div>
			<div>
				<div className='flex -mt-px divide-x divide-gray-200'>
					{/* //TODO: When this is clicked show a modal with the appointments. */}
					<div className='flex flex-1 w-0 text-gray-200 transition group hover:bg-blue-900'>
						<Link
							to={`/users/${user._id}`}
							className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg group-hover:text-gray-200'
						>
							{/* <CalendarIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              /> */}
							<span className='ml-3'>View Profile</span>
						</Link>
					</div>
				</div>
			</div>
		</li>
	)
}
