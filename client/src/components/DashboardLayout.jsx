import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
	CalendarIcon,
	HomeIcon,
	Bars3Icon,
	XMarkIcon,
	ArrowRightEndOnRectangleIcon,
	TicketIcon,
} from '@heroicons/react/24/outline'
import { UserCircleIcon, ScissorsIcon } from '@heroicons/react/24/solid'
import { useAuthStore } from "../store/authStore"

export const DashboardLayout = ({
	children,
	currentTab = 'barbershops',
}) => {
	const user = useAuthStore(state => state.user);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const setToken = useAuthStore(state => state.setToken);
	const setUser = useAuthStore(state => state.setUser);
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [navigate, isAuthenticated])

	const { firstName, lastName, avatar } = user

	// FIXME: Navigation is not working on mobile.
	const userNavigation = [
		{
			name: 'Barbershops',
			to: '/dashboard',
			icon: HomeIcon,
			current: currentTab === 'barbershops',
		},
		{
			name: 'My Appointments',
			to: '/appointments',
			icon: CalendarIcon,
			current: currentTab === 'appointments',
		},
	]

	const barberNavigation = [...userNavigation]

	const adminNavigation = [
		{
			name: 'Barbershops',
			to: '/dashboard',
			icon: HomeIcon,
			current: currentTab === 'barbershops',
		},
		{
			name: 'Appointments',
			to: '/appointments',
			icon: CalendarIcon,
			current: currentTab === 'appointments',
		},
		{
			name: 'Users',
			to: '/users',
			icon: UserCircleIcon,
			current: currentTab === 'users',
		},
		{
			name: 'Barbers',
			to: '/barbers',
			icon: ScissorsIcon,
			current: currentTab === 'barbers',
		},
	]

	let navigation

	if (user.role === 'admin') navigation = adminNavigation
	else if (user.role === 'barber') navigation = barberNavigation
	else navigation = userNavigation

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	const [sidebarOpen, setSidebarOpen] = useState(false)

	const logout = () => {
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('isAuthenticated')

		setToken(null);
		setUser(null);
		setIsAuthenticated(false);

		navigate('/login');
	}

	return (
		<div className='flex h-screen overflow-hidden bg-white'>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as='div'
					static
					className='fixed inset-0 z-40 flex lg:hidden'
					open={sidebarOpen}
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='transition ease-in-out duration-300 transform'
						enterFrom='-translate-x-full'
						enterTo='translate-x-0'
						leave='transition ease-in-out duration-300 transform'
						leaveFrom='translate-x-0'
						leaveTo='-translate-x-full'
					>
						<div className='relative flex flex-col flex-1 w-full max-w-xs bg-white focus:outline-none'>
							<Transition.Child
								as={Fragment}
								enter='ease-in-out duration-300'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='ease-in-out duration-300'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<div className='absolute top-0 right-0 pt-2 -mr-12'>
									<button
										type='button'
										className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
										onClick={() => setSidebarOpen(false)}
									>
										<span className='sr-only'>Close sidebar</span>
										<XMarkIcon className='w-6 h-6 text-white' aria-hidden='true' />
									</button>
								</div>
							</Transition.Child>
							<div className='flex flex-col justify-between flex-1 h-0 pb-4 overflow-y-auto '>
								<div>

									<div className='flex items-center flex-shrink-0 px-4 py-5 text-gray-200 transition bg-blue-900 hover:text-white'>
										<Link to='/'>
											<div className='flex gap-3'>
												<TicketIcon width='30' className='text-blue-200 transform rotate-45' />
												<span className='text-3xl font-semibold tracking-wider text-blue-100/90'>
													Fade
												</span>
											</div>
										</Link>
									</div>
									<nav aria-label='Sidebar' className='mt-5'>
										<div className='px-2 space-y-1'>
											{navigation.map((item) => (
												<Link
													key={item.name}
													to={item.to}
													className={classNames(
														item.current
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
														'group flex items-center px-2 py-2 text-base font-medium rounded-md'
													)}
												>
													<item.icon
														className={classNames(
															item.current
																? 'text-gray-500'
																: 'text-gray-400 group-hover:text-gray-500',
															'mr-4 h-6 w-6'
														)}
														aria-hidden='true'
													/>
													{item.name}
												</Link>
											))}
										</div>
									</nav>
								</div>
								<button
									className='flex items-center px-2 py-2 text-sm font-medium rounded-md group'
									onClick={() => {
										logout()
									}}
								>
									<ArrowRightEndOnRectangleIcon className='w-6 h-6 ml-1 mr-3 text-gray-400 group-hover:text-gray-500' />
									Logout
								</button>
							</div>
							<div className='flex flex-shrink-0 p-4 border-t border-gray-200'>
								<div className='flex-shrink-0 block group'>
									<div className='flex items-center'>
										<div>
											<img
												className='inline-block w-10 h-10 rounded-full'
												src={avatar}
												alt={`${firstName} ${lastName}`}
											/>
										</div>
										<div className='ml-3 '>
											<Link
												to='/profile'
												className='block text-base font-medium text-gray-700 group-hover:text-gray-900'
											>
												{firstName} {lastName}
											</Link>
											<Link
												to='/profile'
												className='text-sm font-medium text-gray-500 group-hover:text-gray-700'
											>
												View profile
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition.Child>
					<div className='flex-shrink-0 w-14' aria-hidden='true'>
						{/* Force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className='hidden lg:flex lg:flex-shrink-0'>
				<div className='flex flex-col w-64'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex flex-col flex-1 h-0 bg-gray-100 border-r border-gray-200'>
						<div className='flex items-center flex-shrink-0 px-4 py-3 text-gray-200 transition bg-blue-900 hover:text-white'>
							<Link to='/'>
								<div className='flex gap-3'>
									<TicketIcon width='30' className='text-blue-200 transform rotate-45' />
									<span className='text-3xl font-semibold tracking-wider text-blue-100/90'>
										Fade
									</span>
								</div>
							</Link>
						</div>{' '}
						<div className='flex flex-col flex-1 overflow-y-auto'>
							<nav className='flex-1 mt-3' aria-label='Sidebar'>
								<div className='px-2 space-y-1'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.to}
											className={classNames(
												item.current
													? 'bg-gray-200 text-gray-900'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
												'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
											)}
										>
											<item.icon
												className={classNames(
													item.current
														? 'text-gray-500'
														: 'text-gray-400 group-hover:text-gray-500',
													'mr-3 h-6 w-6'
												)}
												aria-hidden='true'
											/>
											{item.name}
										</Link>
									))}
								</div>
							</nav>
							<button
								className='flex items-center w-full px-2 py-2 text-sm text-gray-600 rounded-md font-sm group hover:bg-gray-50 hover:text-gray-900'
								onClick={() => {
									logout()
								}}
							>
								<ArrowRightEndOnRectangleIcon className='w-6 h-6 ml-1 mr-3 text-gray-400 group-hover:text-gray-500' />
								Logout
							</button>
						</div>
						<div className='flex flex-shrink-0 p-4 border-t border-gray-200'>
							<div className='flex-shrink-0 block w-full group'>
								<div className='flex items-center'>
									<div>
										<img
											className='inline-block rounded-full h-9 w-9'
											src={avatar}
											alt={`${firstName} ${lastName}'s avatar`}
										/>
									</div>
									<div className='ml-3'>
										<Link
											to='/profile'
											className='block text-sm font-medium text-gray-700 group-hover:text-gray-900'
										>
											{firstName} {lastName}
										</Link>
										<Link
											to='/profile'
											className='text-xs font-medium text-gray-500 group-hover:text-gray-700'
										>
											View profile
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col flex-1 min-w-0 overflow-hidden'>
				<div className='lg:hidden'>
					<div className='flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5'>
						<Link to='/'>
							<div>
								<TicketIcon
									width='30'
									className='text-blue-900 transform rotate-45'
								/>
							</div>
						</Link>

						<div>
							<button
								type='button'
								className='inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-500 rounded-md hover:text-gray-900'
								onClick={() => setSidebarOpen(true)}
							>
								<span className='sr-only'>Open sidebar</span>
								<Bars3Icon className='w-6 h-6' aria-hidden='true' />
							</button>
						</div>
					</div>
				</div>
				<div className='relative z-0 flex flex-1 overflow-hidden'>
					<main className='relative z-0 flex-1 overflow-y-auto focus:outline-none'>
						{/* Start main area*/}
						<div className='absolute inset-0 px-4 py-6 sm:px-6 lg:px-8'>
							{children}
							{/* <div className='h-full border-2 border-gray-200 border-dashed rounded-lg' /> */}
						</div>
						{/* End main area */}
					</main>
					<aside className='relative flex-shrink-0 hidden border-l border-gray-200 xl:flex xl:flex-col w-96'>

					</aside>
				</div>
			</div>
		</div>
	)
}
