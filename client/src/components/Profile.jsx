import { useContext } from 'react'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { Link } from 'react-router-dom'
import { useAuthActions, useUser } from "../store/authStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../components/Form/TextInput";
import { Button } from "../components/Buttons/Button";
import { useUserUpdate } from "../mutations/userMutations";
import { Label } from './Form/Label';

export const Profile = () => {
	const user = useUser();
	const { setUser } = useAuthActions();

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

	const { mutate: updateUser, isPending: isUpdatingUser } = useUserUpdate();

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
			onSuccess: (data) => {
				// FIXME: It doesn't persist the changes, hard reload needed to see updated data.
				displayNotification('Your profile has been updated.')
				setUser(data);
			},
			onError: (error) => {
				console.error(error);
				displayNotification(error.response.data.message);
			}
		});
	}

	return (
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
						</div>
						<div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<Label value="First name" htmlFor="firstName" />
								<TextInput name="firstName" register={register} errors={errors} />
							</div>
							<div className='sm:col-span-3'>
								<Label value="Last name" htmlFor="lastName" />
								<TextInput label="Last name" name="lastName" register={register} errors={errors} />
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
						<Button variant="wide" type="submit" label="Save" loading={isUpdatingUser} loadingText="Saving..." />
					</div>
				</div>
			</div>
		</form>
	)
}
