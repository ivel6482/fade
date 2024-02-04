import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import { TicketIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export const Navbar = ({ homepage }) => {
	return (
		<>
			<Disclosure as='nav' className='bg-white shadow'>
				{({ open }) => (
					<>
						<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
							<div className='flex justify-between h-16'>
								<div className='flex'>
									<div className='flex items-center mr-2 -ml-2 md:hidden'>
										{/* Mobile menu button */}
										<Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
											<span className='sr-only'>Open main menu</span>
											{open ? (
												<XIcon className='block w-6 h-6' aria-hidden='true' />
											) : (
												<MenuIcon
													className='block w-6 h-6'
													aria-hidden='true'
												/>
											)}
										</Disclosure.Button>
									</div>
									<div className='flex items-center flex-shrink-0'>
										<Link to='/'>
											<div className='flex gap-3'>
												<TicketIcon
													width='30'
													className='transform rotate-45'
												/>
												<span className='text-3xl font-light tracking-wider'>
													Fade
												</span>
											</div>
										</Link>
									</div>
									<div className='hidden md:ml-6 md:flex md:space-x-8'>
										{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
										<a
											href='#'
											className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500'
										>
											Dashboard
										</a>
										<a
											href='#'
											className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'
										>
											Team
										</a>
										<a
											href='#'
											className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'
										>
											Projects
										</a>
										<a
											href='#'
											className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700'
										>
											Calendar
										</a>
									</div>
								</div>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>
										<button
											type='button'
											className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										>
											<PlusIcon
												className='w-5 h-5 mr-2 -ml-1'
												aria-hidden='true'
											/>
											<span>New Job</span>
										</button>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className='md:hidden'>
							<div className='pt-2 pb-3 space-y-1'>
								{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50 sm:pl-5 sm:pr-6'
								>
									Dashboard
								</a>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:pl-5 sm:pr-6'
								>
									Team
								</a>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:pl-5 sm:pr-6'
								>
									Projects
								</a>
								<a
									href='#'
									className='block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:pl-5 sm:pr-6'
								>
									Calendar
								</a>
							</div>
							<div className='pt-4 pb-3 border-t border-gray-200'>
								<div className='flex items-center px-4 sm:px-6'>
									<div className='flex-shrink-0'>
										<img
											className='w-10 h-10 rounded-full'
											src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
											alt=''
										/>
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>
											Tom Cook
										</div>
										<div className='text-sm font-medium text-gray-500'>
											tom@example.com
										</div>
									</div>
									<button className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										<span className='sr-only'>View notifications</span>
										<BellIcon className='w-6 h-6' aria-hidden='true' />
									</button>
								</div>
								<div className='mt-3 space-y-1'>
									<a
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
									>
										Your Profile
									</a>
									<a
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
									>
										Settings
									</a>
									<a
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
									>
										Sign out
									</a>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	)
}
