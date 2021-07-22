import { useContext, useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import DashboardLayout from './DashboardLayout'

export default function AdminUserProfile() {
	const { id } = useParams()
	const history = useHistory()
	const { loading, user, getUser, updateUser, deleteUser, updateBarber } =
		useContext(AdminContext)
	const { displayNotification } = useContext(NotificationContext)
	const { getBarbershops, barbershops } = useContext(BarbershopsContext)
	//TODO: Get the user from the admin context, then do the same as below.
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [role, setRole] = useState('')
	const [email, setEmail] = useState('')
	const [barbershop, setBarbershop] = useState('')

	useEffect(() => {
		getUser(id)
		getBarbershops()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		setFirstName(user.firstName)
		setLastName(user.lastName)
		setAvatar(user.avatar)
		setRole(user.role)
		setEmail(user.email)
		setBarbershop(user.barbershop)
	}, [user])

	const deleteHandler = (id) => {
		deleteUser(id, history)
		displayNotification('User deleted successfully.')
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (
			firstName === user.firstName &&
			lastName === user.lastName &&
			email === user.email &&
			role === user.role &&
			barbershop === user.barbershop
		) {
			displayNotification('Please make some changes before saving.')
		} else {
			//TODO: use updateBarber if the user use a barber otherwise use updateUser
			if (user.role === 'barber') {
				updateBarber(user._id, { firstName, lastName, email, role, barbershop })
				displayNotification('Barber has been updated.')
			} else {
				updateUser(user._id, { firstName, lastName, email, role }, history)
				displayNotification('Profile has been updated.')
			}
		}
	}

	return (
		<DashboardLayout currentTab='users'>
			{loading && user === null ? (
				<p>Loading user...</p>
			) : (
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
								<div className='flex justify-between'>
									<p className='mt-1 text-sm text-gray-500'>
										User Id: {user._id}
									</p>
									<button
										type='button'
										className='inline-flex items-center px-3 py-2 text-sm font-semibold leading-4 text-gray-400 bg-white border border-gray-400 rounded-md shadow-sm rounde hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
										onClick={() => deleteHandler(user._id)}
									>
										Delete
									</button>
								</div>
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
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
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
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
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
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
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
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
										>
											<option value='costumer'>Costumer</option>
											<option value='barber'>Barber</option>
											<option value='admin'>Admin</option>
										</select>
									</div>
								</div>
								{user.role === 'barber' && (
									<div className='sm:col-span-3'>
										<label
											htmlFor='barbershop'
											className='block text-sm font-medium text-gray-700'
										>
											Barbershop
										</label>
										<div className='mt-1'>
											<select
												id='barbershop'
												name='barbershop'
												autoComplete='barbershop'
												value={barbershop}
												onChange={(e) => setBarbershop(e.target.value)}
												className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
											>
												<option>Select barbershop</option>
												{barbershops.map((barbershop) => (
													<option key={barbershop._id} value={barbershop._id}>
														{barbershop.name}
													</option>
												))}
											</select>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<Link
								to='/users'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm bg--600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</DashboardLayout>
	)
}
