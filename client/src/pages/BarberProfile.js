import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { UserContext } from '../store/contexts/userContext'
import DashboardLayout from '../components/DashboardLayout'

export default function BarberProfile() {
	//TODO: Add some stats, otherwise it'll be the same as a regular user's profile.
	const { user, updateUserInformation } = useContext(UserContext)
	const { displayNotification } = useContext(NotificationContext)
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)

	const onSubmitHandler = (e) => {
		e.preventDefault()
		updateUserInformation(user._id, { firstName, lastName })
		// alert('Your profile has been updated')
		displayNotification('Your profile has been updated.')
	}
	return (
		<DashboardLayout>
			<form
				onSubmit={onSubmitHandler}
				className='pb-8 space-y-8 divide-y divide-gray-200'
			>
				<div className='space-y-8 divide-y divide-gray-200'>
					<div>
						<div>
							<div>
								<h3 className='text-lg font-semibold leading-6 text-gray-900'>
									Personal Information
								</h3>
								<p className='mt-1 text-sm text-gray-500'>
									Use a permanent address where you can receive mail.
								</p>
							</div>
							<div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='first_name'
										className='block text-sm font-semibold text-gray-700'
									>
										First name
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='first_name'
											id='first_name'
											autoComplete='given-name'
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='last_name'
										className='block text-sm font-semibold text-gray-700'
									>
										Last name
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='last_name'
											id='last_name'
											autoComplete='family-name'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='email'
										className='block text-sm font-semibold text-gray-700'
									>
										Email address
									</label>
									<div className='px-3 py-2 mt-3 bg-gray-100 rounded-md sm:text-sm'>
										<p>{user.email}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='pt-5'>
					<div className='flex justify-end'>
						<Link
							to='/dashboard'
							className='px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
						>
							Cancel
						</Link>
						<button
							type='submit'
							className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-semibold text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</DashboardLayout>
	)
}
