import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'

export default function AdminBarbershop() {
	const { id } = useParams()
	const { barbershop, getBarbershop, loading } = useContext(BarbershopsContext)
	const [name, setName] = useState('')
	const [about, setAbout] = useState('') //TODO: Add an about to the barbershop model.
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [available, setAvailable] = useState([]) // TODO:this can be checkboxes with each day of week, is this an array?

	useEffect(() => {
		getBarbershop(id)
	}, [])

	useEffect(() => {
		setName(barbershop.name)
		setAddress(barbershop?.location?.address)
		setPhoneNumber(barbershop?.contact?.phoneNumber)
	}, [barbershop])

	return (
		<DashboardLayout>
			{loading && barbershop === null ? (
				<p>Loading barbershop...</p>
			) : (
				<form className='space-y-8 divide-y divide-gray-200'>
					<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
						<div>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Barbershop
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									This information will be displayed publicly so be careful what
									you share.
								</p>
							</div>

							<div className='mt-6 space-y-6 sm:mt-5 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='username'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Name
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex max-w-lg rounded-md shadow-sm'>
											<input
												type='text'
												name='name'
												id='name'
												value={name}
												onChange={(e) => setName(e.target.value)}
												autoComplete='name'
												className='flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
										</div>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='about'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										About
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<textarea
											id='about'
											name='about'
											rows={3}
											className='block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											value={about}
											onChange={(e) => setAbout(e.target.value)}
										/>
										<p className='mt-2 text-sm text-gray-500'>
											Write a few sentences about yourself.
										</p>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='photo'
										className='block text-sm font-medium text-gray-700'
									>
										Photo
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex items-center'>
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
												className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
											>
												Change
											</button>
										</div>
									</div>
								</div>

								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='cover_photo'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Cover photo
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<div className='flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
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
														className='relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
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

						<div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Location
								</h3>
								<p className='max-w-2xl mt-1 text-sm text-gray-500'>
									Use a permanent address where you can receive mail.
								</p>
							</div>
							<div className='space-y-6 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='first_name'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Address
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<input
											type='text'
											name='address'
											id='address'
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											autoComplete='address'
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Contact
								</h3>
							</div>
							<div className='space-y-6 sm:space-y-5'>
								<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
									<label
										htmlFor='first_name'
										className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
									>
										Phone Number
									</label>
									<div className='mt-1 sm:mt-0 sm:col-span-2'>
										<input
											type='text'
											name='address'
											id='address'
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											autoComplete='address'
											className='block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm'
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-8 space-y-6 divide-y divide-gray-200 sm:pt-10 sm:space-y-5'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Days Available
								</h3>
							</div>
							<div className='space-y-6 divide-y divide-gray-200 sm:space-y-5'>
								<div className='pt-6 sm:pt-5'>
									<div role='group' aria-labelledby='label-email'>
										<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
											<div>
												<div
													className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
													id='label-email'
												>
													What days of the week will you the open to the public?
												</div>
											</div>
											{/* //TODO: how to prefill the checkboxes? will the values be and array? */}
											<div className='mt-4 space-y-3 sm:mt-0 sm:col-span-2'>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Monday
															</label>
														</div>
													</div>
												</div>{' '}
												{/* checkbox end */}
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Tuesday
															</label>
														</div>
													</div>
												</div>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Wednesday
															</label>
														</div>
													</div>
												</div>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Thursday
															</label>
														</div>
													</div>
												</div>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Friday
															</label>
														</div>
													</div>
												</div>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Saturday
															</label>
														</div>
													</div>
												</div>
												<div className='max-w-lg space-y-4'>
													<div className='relative flex items-start'>
														<div className='flex items-center h-5'>
															<input
																id='comments'
																name='comments'
																type='checkbox'
																className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
															/>
														</div>
														<div className='ml-3 text-sm'>
															<label
																htmlFor='comments'
																className='font-medium text-gray-700'
															>
																Sunday
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5 pb-5'>
						<div className='flex justify-end'>
							<button
								type='button'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</DashboardLayout>
	)
}
