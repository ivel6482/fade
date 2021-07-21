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
			<h3 className='text-6xl font-bold text-gray-200 lg:text-8xl 2xl:text-9xl'>
				Barbershops
			</h3>
			{/* {errors && <ErrorList errors={errors} />} */}
			{/* <section className='flex flex-wrap mt-8'> */}
			{user?.role === 'admin' && <Stats stats={stats} />}
			{user?.role === 'admin' && (
				<div className='flex justify-end'>
					<Link
						to='/barbershops/new'
						type='button'
						className='flex items-center gap-2 px-3 py-2 text-white transition bg-gray-900 rounded-md hover:bg-gray-700'
					>
						<PlusIcon width='20' height='20' /> New Barbershop
					</Link>
				</div>
			)}
			<section className='grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-3'>
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
