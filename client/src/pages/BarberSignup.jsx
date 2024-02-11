import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Layout } from '../components/Layout'
import { TicketIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../components/Form/Input"
import { Button } from "../components/Buttons/Button"
import { useLogin, useRegisterBarber } from "../mutations/authMutations"
import { useAuthStore } from "../store/authStore"

export const BarberSignup = () => {
	const barberSignupValidationSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().email().min(1),
		password: z.string().min(1),
		confirmPassword: z.string().min(1)
	}).refine(({ confirmPassword, password }) => confirmPassword === password, {
		message: "Passwords must match.",
		path: ["confirmPassword"]
	});

	const { handleSubmit, register, reset, formState: { errors } } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
		resolver: zodResolver(barberSignupValidationSchema)
	});

	const { mutate: registerBarber, isPending: isRegistering } = useRegisterBarber();
	const { mutate: login, isPending: isLoggingIn } = useLogin();

	const user = useAuthStore(state => state.user);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);

	const setUser = useAuthStore(state => state.setUser);
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
	const setToken = useAuthStore(state => state.setToken);

	const { displayNotification } = useContext(NotificationContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [user, isAuthenticated, navigate])

	const submitHandler = (data) => {
		const { firstName, lastName, email, password } = data;

		registerBarber({
			firstName,
			lastName,
			email,
			password
		}, {
			onSuccess: (data) => {
				reset();

				login({ email, password }, {
					onSuccess: (data) => {
						sessionStorage.setItem('token', JSON.stringify(data.token))
						sessionStorage.setItem('user', JSON.stringify(data.user))
						sessionStorage.setItem('isAuthenticated', JSON.stringify(true))

						setToken(data.token);
						setUser(data.user);
						setIsAuthenticated(true);

						navigate("/dashboard");
					},
					onError: (error) => {
						displayNotification(error.message);
					}
				});
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
			}
		})
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
						<form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
							<Input label="First name" name="firstName" register={register} errors={errors} />
							<Input label="Last name" name="lastName" register={register} errors={errors} />
							<Input label="Email address" name="email" register={register} errors={errors} />
							<Input label="Password" name="password" type="password" register={register} errors={errors} />
							<Input label="Confirm password" name="confirmPassword" type="password" register={register} errors={errors} />
							<Button label="Sign up" loading={isLoggingIn || isRegistering} loadingText="Signing up..." type="submit" />
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}
