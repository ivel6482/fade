import { useContext, useEffect } from 'react'
import Barbershop from './Barbershop'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import ErrorList from '../components/ErrorList'

export default function BarbershopList() {
	const { barbershops, loading, errors, getBarbershops } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getBarbershops()
	}, [])

	return (
		<section className='h-4/5'>
			<h3 className='font-bold text-gray-200 text-9xl'>Barbershops</h3>
			{errors && <ErrorList errors={errors} />}
			<section className='flex flex-wrap mt-8'>
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
