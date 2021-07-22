import { useContext, useEffect } from 'react'
import Barbershop from './Barbershop'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import Stats from '../components/Stats'
import { UserContext } from '../store/contexts/userContext'
import { PlusIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export default function BarbershopList() {
	const { user } = useContext(UserContext)
	const { barbershops, loading, getBarbershops } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getBarbershops()
		// eslint-disable-next-line
	}, [])

	const stats = [
		{
			name: 'Total Barbershops',
			stat: barbershops.length,
		},
	]

	return (
		<section className='h-4/5'>
			<div className='flex flex-col justify-between sm:flex-row'>
				<h3 className='text-6xl font-bold text-gray-200 lg:text-7xl '>
					Barbershops
				</h3>
				{/* {user?.role === 'admin' && <Stats stats={stats} />} */}
				<div className='mt-6 sm:mt-0 sm:transform sm:translate-y-1/2'>
					{user?.role === 'admin' && (
						<Link
							to='/barbershops/new'
							type='button'
							className='inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-200 bg-blue-900 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900'
						>
							<PlusIcon width='20' height='20' /> New Barbershop
						</Link>
					)}
				</div>
			</div>
			<section className='grid grid-cols-1 mt-8 sm:grid-cols-2 2xl:grid-cols-3'>
				{barbershops.length > 0 ? (
					barbershops.map((barbershop) => (
						<Barbershop key={barbershop._id} barbershop={barbershop} />
					))
				) : (
					<section className='flex items-center justify-center h-full'>
						<p className='text-2xl font-bold text-gray-300'>
							{loading ? 'Loading barbershops...' : 'No barbershops available.'}
						</p>
					</section>
				)}
			</section>
		</section>
	)
}
