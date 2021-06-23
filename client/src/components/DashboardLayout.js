import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
	CalendarIcon,
	HomeIcon,
	MenuIcon,
	XIcon,
	LogoutIcon,
	ChartBarIcon,
} from '@heroicons/react/outline'
import { UserCircleIcon, ScissorsIcon } from '@heroicons/react/solid'

export default function DashboardLayout({
	children,
	currentTab = 'barbershops',
}) {
	const { user, isAuthenticated, logout } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/login')
		}
	}, [history, user, isAuthenticated])

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

	const barberNavigation = [
		...userNavigation,
		{
			name: 'Stats',
			to: '/appointments',
			icon: ChartBarIcon,
			current: currentTab === 'stats',
		},
	]

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
										<XIcon className='w-6 h-6 text-white' aria-hidden='true' />
									</button>
								</div>
							</Transition.Child>
							<div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
								<div className='flex items-center flex-shrink-0 px-4'>
									<img
										className='w-auto h-8'
										src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg'
										alt='Workflow'
									/>
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
										<button
											className='flex items-center px-2 py-2 text-sm font-medium rounded-md group'
											onClick={() => {
												logout(history)
											}}
										>
											<LogoutIcon className='w-6 h-6 ml-1 mr-3 text-gray-400 group-hover:text-gray-500' />
											Logout
										</button>
									</div>
								</nav>
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
						<div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
							<div className='flex items-center flex-shrink-0 px-4'>
								<img
									className='w-auto h-8'
									src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg'
									alt='Workflow'
								/>
							</div>
							<nav className='flex-1 mt-5' aria-label='Sidebar'>
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
									<button
										className='flex items-center w-full px-2 py-2 text-sm text-gray-600 rounded-md font-sm group hover:bg-gray-50 hover:text-gray-900'
										onClick={() => {
											logout(history)
										}}
									>
										<LogoutIcon className='w-6 h-6 ml-1 mr-3 text-gray-400 group-hover:text-gray-500' />
										Logout
									</button>
								</div>
							</nav>
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
						<div>
							<img
								className='w-auto h-8'
								src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
								alt='Workflow'
							/>
						</div>
						<div>
							<button
								type='button'
								className='inline-flex items-center justify-center w-12 h-12 -mr-3 text-gray-500 rounded-md hover:text-gray-900'
								onClick={() => setSidebarOpen(true)}
							>
								<span className='sr-only'>Open sidebar</span>
								<MenuIcon className='w-6 h-6' aria-hidden='true' />
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
						{/* Start secondary column (hidden on smaller screens) */}
						<div className='absolute inset-0 px-4 py-6 sm:px-6 lg:px-8'>
							{/* <div className='h-full border-2 border-gray-200 border-dashed rounded-lg' /> */}
							<article className='p-3 space-y-2 transition bg-gray-100 rounded hover:shadow-lg'>
								<p className='font-semibold text-gray-800'>
									Lorem ipsum dolor sit amet.
								</p>
								<p className='text-gray-500'>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
									et odit voluptas amet corrupti, dolorem deleniti placeat
									debitis accusantium quidem.
								</p>
							</article>
						</div>
						{/* End secondary column */}
					</aside>
				</div>
			</div>
		</div>
	)
}
