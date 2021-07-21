import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import User from '../components/User'
import Stats from '../components/Stats'
import { AdminContext } from '../store/contexts/adminContext'
import { PlusIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

export default function AdminUsers() {
	const { loading, users, getUsers, usersCount } = useContext(AdminContext)

	useEffect(() => {
		getUsers()
		// eslint-disable-next-line
	}, [])

	const stats = [
		{
			name: 'Total Users',
			stat: usersCount,
		},
	]

	return (
		<DashboardLayout currentTab='users'>
			<h3 className='font-bold text-gray-300 text-8xl'>Users</h3>
			{loading ? (
				<p>Loading users...</p>
			) : (
				<>
					<Stats stats={stats} />
					<div className='flex justify-end mb-3'>
						<Link
							to='/users/new'
							className='inline-flex items-center justify-center gap-2 px-3 py-2 text-white transition bg-gray-900 rounded-md hover:bg-gray-800'
						>
							<PlusIcon width='20' height='20' /> Create User
						</Link>
					</div>
					<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{users.length === 0 ? (
							<p className='text-gray-500'>There are no users.</p>
						) : (
							users.map((user) => {
								return <User user={user} key={user._id} />
							})
						)}
					</ul>
				</>
			)}
		</DashboardLayout>
	)
}
