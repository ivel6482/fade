import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { DashboardLayout } from '../components/DashboardLayout'
import { useUser } from "../store/authStore"
import { useForm } from "react-hook-form";
import { useUserUpdate } from "../mutations/userMutations";
import { TextInput } from "../components/Form/TextInput";
import { Button } from "../components/Buttons/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '../components/Form/Label'

export const BarberProfile = () => {
	//TODO: Add some stats, otherwise it'll be the same as a regular user's profile.
	const user = useUser();

	const updateUserValidationSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1)
	});

	const { handleSubmit, register, formState: { errors } } = useForm({
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName
		},
		resolver: zodResolver(updateUserValidationSchema)
	});

	const { mutate: updateUser, isPending: isUpdating } = useUserUpdate();

	const { displayNotification } = useContext(NotificationContext)

	const onSubmitHandler = (data) => {
		const { firstName, lastName } = data;

		updateUser({
			userId: user._id,
			infoToUpdate: {
				firstName,
				lastName
			}
		}, {
			onSuccess: () => {
				displayNotification('Your profile has been updated.')
			},
			onError: (error) => {
				console.error(error);
				displayNotification('Your profile has been updated.')
			}
		})
	}
	return (
		<DashboardLayout>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
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
									<Label value="First name" htmlFor="firstName" />
									<TextInput name="firstName" register={register} errors={errors} />
								</div>
								<div className='sm:col-span-3'>
									<Label value="Last name" htmlFor="lastName" />
									<TextInput name="lastName" register={register} errors={errors} />
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
						<div className="ml-3">
							<Button label="Save" loading={isUpdating} loadingText="Saving.." type="submit" />
						</div>
					</div>
				</div>
			</form>
		</DashboardLayout>
	)
}
