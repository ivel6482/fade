import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import DashboardLayout from './DashboardLayout'

export default function AdminNewUser() {
	const history = useHistory()

	const { createUser } = useContext(AdminContext)

	const { displayNotification } = useContext(NotificationContext)

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			password === '' ||
			role === ''
		) {
			displayNotification('Please fill all the required information.')
		} else {
			createUser({ firstName, lastName, email, password, role }, history)
			displayNotification('User created successfully.')
		}
	}

	return (
		<DashboardLayout currentTab='users'>
			<form
				onSubmit={onSubmitHandler}
				className='pb-4 space-y-8 divide-y divide-gray-200'
			>
				<div className='space-y-8 divide-y divide-gray-200'>
					<div className='pt-8'>
						<div>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Personal Information
							</h3>
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
										placeholder='John'
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
										placeholder='Doe'
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
										placeholder='johndoe@example.com'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700'
								>
									Password
								</label>
								<div className='mt-1'>
									<input
										id='password'
										name='password'
										type='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										placeholder='****************'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='role'
									className='block text-sm font-medium text-gray-700'
								>
									Role
								</label>
								<div className='mt-1'>
									<select
										id='role'
										name='role'
										autoComplete='role'
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									>
										<option>Select a role</option>
										<option value='costumer'>Costumer</option>
										<option value='barber'>Barber</option>
										<option value='admin'>Admin</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='pt-5'>
					<div className='flex justify-end'>
						<Link
							to='/users'
							className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Cancel
						</Link>
						<button
							type='submit'
							className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Create User
						</button>
					</div>
				</div>
			</form>
		</DashboardLayout>
	)
}
