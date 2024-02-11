import { TicketIcon } from '@heroicons/react/24/outline'
import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/Buttons/Button";
import { Input } from "../components/Form/Input";
import { useLogin } from "../mutations/authMutations";

export const Login = () => {
	const loginValidationSchema = z.object({
		email: z.string().email().min(1),
		password: z.string().min(1)
	});

	const { handleSubmit, register, reset, formState: { errors } } = useForm({
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: zodResolver(loginValidationSchema)
	});

	const { mutate: login, isLoading: isLoggingIn } = useLogin();

	const navigate = useNavigate()

	const user = useAuthStore(state => state.user);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);

	const setUser = useAuthStore(state => state.setUser);
	const setToken = useAuthStore(state => state.setToken);
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

	const { displayNotification } = useContext(NotificationContext)

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [navigate, user, isAuthenticated])

	const submitHandler = (data) => {
		const { email, password } = data;

		reset();

		login({ email, password }, {
			onSuccess: (data) => {
				sessionStorage.setItem('token', JSON.stringify(data.token))
				sessionStorage.setItem('user', JSON.stringify(data.user))
				sessionStorage.setItem('isAuthenticated', JSON.stringify(true))

				setToken(data.token);
				setUser(data.user);
				setIsAuthenticated(true);

				navigate("/aaaa");

				return;



				navigate("/dashboard");
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
						<form onSubmit={handleSubmit(submitHandler)} className='space-y-6'>
							<Input label="Email" name="email" register={register} errors={errors} />
							<Input label="Password" name="password" type="password" register={register} errors={errors} />
							<Button label="Log in" loading={isLoggingIn} loadingText="Logging in..." type="submit" />
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}
