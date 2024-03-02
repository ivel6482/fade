import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { DashboardLayout } from './DashboardLayout'
import { useCreateUser } from '../mutations/authMutations'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../components/Form/Label";
import { TextInput } from "../components/Form/TextInput";
import { SelectInput } from "../components/Form/SelectInput";
import { roles } from "../utils/roles";

export const AdminNewUser = () => {
	const navigate = useNavigate()

	const { displayNotification } = useContext(NotificationContext)
	const { mutate: createUser } = useCreateUser();

	const createUserValidationSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(1),
		role: z.string().min(1)
	});

	const { handleSubmit, register, formState: { errors } } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			role: ""
		},
		resolver: zodResolver(createUserValidationSchema)
	});

	const onSubmitHandler = (data) => {
		const { firstName, lastName, email, password, role } = data;

		createUser({ firstName, lastName, email, password, role }, {
			onSuccess: () => {
				displayNotification('User created successfully.')
				navigate("/users");
			},
			onError: (error) => {
				displayNotification('User created successfully.')
				console.error(error.response.data.message);
			}
		})
	}

	return (
		<DashboardLayout currentTab='users'>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
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
								<Label value="First name" htmlFor="firstName" />
								<div className='mt-1'>
									<TextInput register={register} errors={errors} name="firstName" id="firstName" />
								</div>
							</div>
							<div className='sm:col-span-3'>
								<Label value="Last name" htmlFor="lastName" />
								<div className='mt-1'>
									<TextInput register={register} errors={errors} name="lastName" id="lastName" />
								</div>
							</div>

							<div className='sm:col-span-3'>
								<Label value="Email address" htmlFor="email" />
								<div className='mt-1'>
									<TextInput register={register} errors={errors} name="email" id="email" type="email" />
								</div>
							</div>

							<div className='sm:col-span-3'>
								<Label value="Password" htmlFor="password" />
								<div className='mt-1'>
									<TextInput register={register} errors={errors} name="password" type="password" id="password" />
								</div>
							</div>

							<div className='sm:col-span-3'>
								<Label value="Role" htmlFor="role" />
								<div className='mt-1'>
									<SelectInput register={register} errors={errors} name="role" id="role" defaultOptionText="Select a role" options={roles.map(role => ({ text: role, value: role.toLocaleLowerCase() }))} />
								</div>
							</div>
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
							className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
						>
							Create User
						</button>
					</div>
				</div>
			</form>
		</DashboardLayout>
	)
}
