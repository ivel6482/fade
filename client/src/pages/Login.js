import { TicketIcon } from '@heroicons/react/outline'
import { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import { UserContext } from '../store/contexts/userContext'
import { NotificationContext } from '../store/contexts/notificationsContext'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	const { login, loading, user, isAuthenticated } = useContext(UserContext)
	const { displayNotification } = useContext(NotificationContext)

	useEffect(() => {
		if (user && isAuthenticated) {
			history.push('/dashboard')
		}
	}, [history, user, isAuthenticated])

	const submitHandler = (e) => {
		e.preventDefault()
		login(email, password, history, displayNotification)
		setEmail('')
		setPassword('')
	}

	return (
		<>
			{history.location.pathname === '/login' ? (
				<Layout>
					<div className='w-full max-w-sm mx-auto lg:w-96'>
						<div>
							<TicketIcon width='30' className='transform rotate-45' />
							<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
								Log in to your account
							</h2>
							<p className='mt-2 text-sm text-gray-600'>
								Are you a barber?{' '}
								<Link
									to='/signup/barber'
									className='font-medium text-blue-600 hover:text-blue-500'
								>
									sign up for a barber account
								</Link>
							</p>
							<p className='mt-2 text-sm text-gray-600'>
								Don't have an account?{' '}
								<Link
									to='/signup'
									className='font-medium text-blue-600 hover:text-blue-500'
								>
									sign up for free
								</Link>
							</p>
						</div>

						<div className='mt-8'>
							<div className='mt-6'>
								<form onSubmit={submitHandler} className='space-y-6'>
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
												className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
												className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
										</div>
									</div>

									<div>
										<button
											type='submit'
											className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
										>
											{loading ? 'Authenticating...' : 'Log in'}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</Layout>
			) : (
				<div className='w-full max-w-sm mx-auto lg:w-96'>
					<div>
						<TicketIcon width='30' className='transform rotate-45' />
						<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
							Log in to your account
						</h2>
						<p className='mt-2 text-sm text-gray-600'>
							Are you a barber?{' '}
							<Link
								to='/signup/barber'
								className='font-medium text-blue-600 hover:text-blue-500'
							>
								sign up for a barber account
							</Link>
						</p>
						<p className='mt-2 text-sm text-gray-600'>
							Don't have an account?{' '}
							<Link
								to='/signup'
								className='font-medium text-blue-600 hover:text-blue-500'
							>
								sign up for free
							</Link>
						</p>
					</div>

					<div className='mt-8'>
						<div className='mt-6'>
							<form onSubmit={submitHandler} className='space-y-6'>
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
											className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
											className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
									>
										{loading ? 'Authenticating...' : 'Log in'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
