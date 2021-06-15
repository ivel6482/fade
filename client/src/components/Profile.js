import { useContext, useState } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { Link } from 'react-router-dom'

export default function Profile() {
	const { user, updateUserInformation } = useContext(UserContext)
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)

	const onSubmitHandler = (e) => {
		e.preventDefault()
		updateUserInformation(user._id, { firstName, lastName })
		alert('Your profile has been updated')
	}

	return (
		<form
			onSubmit={onSubmitHandler}
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
								<label
									htmlFor='first_name'
									className='block text-sm font-semibold text-gray-700'
								>
									First name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										name='first_name'
										id='first_name'
										autoComplete='given-name'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='last_name'
									className='block text-sm font-semibold text-gray-700'
								>
									Last name
								</label>
								<div className='mt-1'>
									<input
										type='text'
										name='last_name'
										id='last_name'
										autoComplete='family-name'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='sm:col-span-4'>
								<label
									htmlFor='email'
									className='block text-sm font-semibold text-gray-700'
								>
									Email address
								</label>
								<div className='mt-1'>
									<p>{user.email}</p>
									{/* <input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/> */}
								</div>
							</div>
						</div>
					</div>
					<div className='pt-8'>
						<h3 className='text-lg font-semibold leading-6 text-gray-900'>
							Profile
						</h3>
						<p className='mt-1 text-sm text-gray-500'>
							This information will be displayed publicly so be careful what you
							share.
						</p>
					</div>

					<div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
						<div className='sm:col-span-6'>
							<label
								htmlFor='photo'
								className='block text-sm font-semibold text-gray-700'
							>
								Photo
							</label>
							<div className='flex items-center mt-1'>
								<span className='w-12 h-12 overflow-hidden bg-gray-100 rounded-full'>
									<svg
										className='w-full h-full text-gray-300'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
									</svg>
								</span>
								<button
									type='button'
									className='px-3 py-2 ml-5 text-sm font-semibold leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Change
								</button>
							</div>
						</div>

						<div className='sm:col-span-6'>
							<label
								htmlFor='cover_photo'
								className='block text-sm font-semibold text-gray-700'
							>
								Cover photo
							</label>
							<div className='flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md'>
								<div className='space-y-1 text-center'>
									<svg
										className='w-12 h-12 mx-auto text-gray-400'
										stroke='currentColor'
										fill='none'
										viewBox='0 0 48 48'
										aria-hidden='true'
									>
										<path
											d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
											strokeWidth={2}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<div className='flex text-sm text-gray-600'>
										<label
											htmlFor='file-upload'
											className='relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
										>
											<span>Upload a file</span>
											<input
												id='file-upload'
												name='file-upload'
												type='file'
												className='sr-only'
											/>
										</label>
										<p className='pl-1'>or drag and drop</p>
									</div>
									<p className='text-xs text-gray-500'>
										PNG, JPG, GIF up to 10MB
									</p>
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
						className='px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Cancel
					</Link>
					<button
						type='submit'
						className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	)
}
