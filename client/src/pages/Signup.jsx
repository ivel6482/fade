import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Layout } from '../components/Layout'
import { TicketIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";
import { Input } from "../components/Form/Input"

export const Signup = () => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const { signup, loading, user, isAuthenticated } = useContext(UserContext)
	const { displayNotification } = useContext(NotificationContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [user, isAuthenticated, navigate])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			displayNotification("Password does not match.")
			return;
		}

		signup(firstName, lastName, email, password, navigate, displayNotification)
		setEmail('')
		setFirstName('')
		setLastName('')
		setPassword('')
	}
	return (
		<Layout>
			<div className='w-full max-w-sm mx-auto lg:w-96'>
				<div>
					<TicketIcon width='30' className='transform rotate-45' />
					<h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
						Make an account
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
						<form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
							<Input label="First name" name="firstName" required={true} register={register} />
							<Input label="Last name" name="lastName" required={true} register={register} />
							<Input label="Email" name="email" required={true} register={register} />
							<Input type="password" label="Password" name="password" required={true} register={register} />
							<Input type="password" label="Confirm password" name="confirmPassword" required={true} register={register} validate={{
								samePassword: (confirmPassword, formData) => {
									return confirmPassword === formData.password || "Passwords should match."
								}
							}}
								errors={errors} />
							<div>
								<button
									type='submit'
									className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
								>
									{loading ? 'Authenticating...' : 'Sign up'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}
