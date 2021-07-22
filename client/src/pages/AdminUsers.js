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
			{loading ? (
				<p>Loading users...</p>
			) : (
				<>
					{/* <Stats stats={stats} /> */}
					<div className='flex justify-between gap-4'>
						<h3 className='text-6xl font-bold text-gray-200 lg:text-7xl'>
							Users
						</h3>
						<div className='transform translate-y-1/3 sm:translate-y-1/2'>
							<Link
								to='/users/new'
								className='inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-200 transition bg-blue-900 rounded-md hover:bg-blue-800'
							>
								<PlusIcon width='20' height='20' /> Create User
							</Link>
						</div>
					</div>
					<ul className='grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4'>
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
