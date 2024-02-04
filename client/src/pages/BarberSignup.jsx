import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Layout } from '../components/Layout'
import { TicketIcon } from '@heroicons/react/24/outline'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'

export const BarberSignup = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [barbershopId, setBarbershopId] = useState('')

	const { barberSignup, loading, user, isAuthenticated } =
		useContext(UserContext)
	const { getBarbershops, barbershops } = useContext(BarbershopsContext)
	const { displayNotification } = useContext(NotificationContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [user, isAuthenticated, navigate])

	useEffect(() => {
		getBarbershops()
		// eslint-disable-next-line
	}, [])

	const submitHandler = (e) => {
		e.preventDefault()
		barberSignup(
			firstName,
			lastName,
			email,
			password,
			barbershopId,
			navigate,
			displayNotification
		)
		setEmail('')
		setFirstName('')
		setLastName('')
		setPassword('')
		setBarbershopId('')
	}

	return (
		<Layout>
			<div className='w-full max-w-sm mx-auto lg:w-96'>
				<div>
					<TicketIcon width='30' className='transform rotate-45' />
					<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
						Make a barber account
					</h2>
					<p className='mt-2 text-sm text-gray-600'>
						Already have an account?{' '}
						<Link
							to='/login'
							className='font-medium text-blue-600 hover:text-blue-500'
						>
							log in here
						</Link>
					</p>
				</div>

				<div className='mt-8'>
					<div className='mt-6'>
						<form onSubmit={submitHandler} className='space-y-6'>
							<div>
								<label
									htmlFor='firstName'
									className='block text-sm font-medium text-gray-700'
								>
									First Name
								</label>
								<div className='mt-1'>
									<input
										id='firstName'
										name='firstName'
										type='firstName'
										required
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='lastName'
									className='block text-sm font-medium text-gray-700'
								>
									Last Name
								</label>
								<div className='mt-1'>
									<input
										id='lastName'
										name='lastName'
										type='lastName'
										required
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm focus:ring-1'
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
							<div>
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
										autoComplete='email'
										required
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
									/>
								</div>
							</div>

							<div className='space-y-1'>
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
										autoComplete='current-password'
										required
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='barbershop'
									className='block text-sm font-medium text-gray-700'
								>
									Barbershop
								</label>
								<select
									id='barbershop'
									name='barbershop'
									autoComplete='barbershop'
									value={barbershopId}
									onChange={(e) => setBarbershopId(e.target.value)}
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
							<div>
								<button
									type='submit'
									className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
								>
									{loading ? 'Authenticating...' : 'Sign Up'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}
