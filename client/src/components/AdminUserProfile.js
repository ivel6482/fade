import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'
import DashboardLayout from './DashboardLayout'

export default function AdminUserProfile() {
	//createdAt
	//updatedAt
	//_id
	const { user } = useContext(UserContext)
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)
	const [avatar, setAvatar] = useState(user.avatar)
	const [role, setRole] = useState(user.role)
	const [email, setEmail] = useState(user.email)

	return (
		<DashboardLayout currentTab='users'>
			<form className='pb-4 space-y-8 divide-y divide-gray-200'>
				<div className='space-y-8 divide-y divide-gray-200'>
					<div className='pt-8'>
						<div>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Personal Information
							</h3>
							<p className='mt-1 text-sm text-gray-500'>User Id: {user._id}</p>
						</div>
						<div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<label
									htmlFor='first_name'
									className='block text-sm font-medium text-gray-700'
								>
									First name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										name='first_name'
										id='first_name'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										autoComplete='given-name'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>
							<div className='sm:col-span-3'>
								<label
									htmlFor='last_name'
									className='block text-sm font-medium text-gray-700'
								>
									Last name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										name='last_name'
										id='last_name'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										autoComplete='family-name'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700'
								>
									Email address
								</label>
								<div className='mt-1'>
									<input
										id='email'
										name='email'
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete='email'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='country'
									className='block text-sm font-medium text-gray-700'
								>
									Role
								</label>
								<div className='mt-1'>
									<select
										id='country'
										name='country'
										autoComplete='country'
										value={role}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									>
										<option value='costumer'>Costumer</option>
										<option value='barber'>Barber</option>
										<option value='admin'>Admin</option>
									</select>
								</div>
							</div>
							<div className='sm:col-span-6'>
								<label
									htmlFor='photo'
									className='block text-sm font-medium text-gray-700'
								>
									Photo
								</label>
								<div className='flex items-center mt-1'>
									<span className='w-12 h-12 overflow-hidden bg-gray-100 rounded-full'>
										<img
											className='w-full h-full text-gray-300'
											src={avatar}
											alt={`${user.firstName} ${user.lastName} profile.`}
										/>
									</span>
									<button
										type='button'
										className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Change
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='pt-5'>
					<div className='flex justify-end'>
						<button
							type='button'
							className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</DashboardLayout>
	)
}
