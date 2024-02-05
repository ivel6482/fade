import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Layout } from '../components/Layout'
import { TicketIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";
import { Input } from "../components/Form/Input"
import { Button } from "../components/Buttons/Button"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Signup = () => {
	const validationSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().email().min(1),
		password: z.string().min(1),
		confirmPassword: z.string().min(1),
	})
		.refine(({ confirmPassword, password }) => confirmPassword === password, {
			message: "Passwords must match.",
			path: ["confirmPassword"]
		});

	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		resolver: zodResolver(validationSchema)
	});

	const { signup, loading, user, isAuthenticated } = useContext(UserContext)
	const { displayNotification } = useContext(NotificationContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [user, isAuthenticated, navigate])

	const submitHandler = async (data, error) => {
		try {
			const { firstName, lastName, email, password } = data;
			await signup(firstName, lastName, email, password, navigate, displayNotification);
			reset();
		} catch (error) {
			console.error(error);
		}
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
							<Input label="First name" name="firstName" register={register} errors={errors} />
							<Input label="Last name" name="lastName" register={register} errors={errors} />
							<Input label="Email" name="email" register={register} errors={errors} />
							<Input type="password" label="Password" name="password" register={register} errors={errors} />
							<Input type="password" label="Confirm password" name="confirmPassword" register={register} errors={errors} />
							<Button label="Sign up" loading={loading} loadingText="Signing up..." type="submit" />
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}
