import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../store/contexts/notificationsContext'
import { useForm } from 'react-hook-form'
import { useUser } from '../queries/userQueries'
import { useBarbershops } from '../queries/barbershopQueries'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserDelete, useUserUpdate } from '../mutations/userMutations'
import { useBarberUpdate } from '../mutations/barberMutations'
import { DashboardLayout } from "../components/DashboardLayout";
import { Label } from "../components/Form/Label";
import { TextInput } from "../components/Form/TextInput";
import { SelectInput } from "../components/Form/SelectInput";
import { Link } from 'react-router-dom';

export const AdminUserProfile = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { displayNotification } = useContext(NotificationContext)

	const { data: user, isPending: isUserPending } = useUser(id);
	const { data: barbershops, isPending: isBarbershopsPending } = useBarbershops();

	const { mutate: deleteUser } = useUserDelete();
	const { mutate: updateUser } = useUserUpdate();
	const { mutate: updateBarber } = useBarberUpdate();

	const updateUserValidationSchema = z.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		avatar: z.string().min(1),
		role: z.string().min(1),
		email: z.string().email(),
		barbershop: z.string().min(1)
	});

	const { handleSubmit, register, formState: { errors } } = useForm({
		values: user,
		resolver: zodResolver(updateUserValidationSchema)
	});

	const deleteHandler = (id) => {
		deleteUser({ userId: id }, {
			onSuccess: () => {
				displayNotification('User deleted successfully.');
				navigate('/users');
			},
			onError: (error) => {
				displayNotification(error.response.data.message);
				console.error(error)
			}
		})
	}

	const onSubmitHandler = (data) => {
		const { firstName, lastName, email, barbershop } = data;

		if (user.role === 'barber') {
			updateBarber({
				barberId: user._id,
				infoToUpdate: {
					firstName,
					lastName,
					email,
					barbershop
				}
			}, {
				onSuccess: () => {
					displayNotification('Barber has been updated.');
				},
				onError: (error) => {
					displayNotification(error.data.response.message);
					console.error(error);
				}
			});
		} else {
			updateUser({
				userId: user._id,
				infoToUpdate: {
					firstName,
					lastName,
					email,
				}
			}, {
				onSuccess: () => {
					displayNotification('Profile has been updated.')
				},
				onError: (error) => {
					displayNotification(error.data.response.message);
					console.error(error);
				}
			});
		}
	}

	return (
		<DashboardLayout currentTab='users'>
			{isBarbershopsPending || isUserPending ? (
				<p>Loading user...</p>
			) : (
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
									<Label value="First name" htmlFor="firstName" />
									<div className='mt-1'>
										<TextInput
											register={register}
											errors={errors}
											name="firstName"
											id="firstName"
										/>
									</div>
								</div>
								<div className='sm:col-span-3'>
									<Label value="Last name" htmlFor="lastName" />
									<div className='mt-1'>
										<TextInput
											register={register}
											errors={errors}
											name="lastName"
											id="lastName"
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<Label value="Email address" htmlFor="email" />
									<div className='mt-1'>
										<TextInput
											register={register}
											errors={errors}
											name="email"
											id="email"
											type="email"
										/>
									</div>
								</div>

								{user.role === 'barber' && (
									<div className='sm:col-span-3'>
										<Label value="Barbershop" htmlFor="barbershop" />
										<div className='mt-1'>
											<SelectInput
												register={register}
												errors={errors}
												id='barbershop'
												name='barbershop'
												defaultOptionText="Select a barbershop"
												options={barbershops.map(barbershop => ({ text: barbershop.name, value: barbershop._id }))}
											/>
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
			)
			}
		</DashboardLayout >
	)
}
