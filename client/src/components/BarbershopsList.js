import { useContext, useEffect } from 'react'
import Barbershop from './Barbershop'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import ErrorList from '../components/ErrorList'
import Stats from '../components/Stats'
import { UserContext } from '../store/contexts/userContext'

export default function BarbershopList() {
	const { user } = useContext(UserContext)
	const { barbershops, loading, errors, getBarbershops } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getBarbershops()
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
