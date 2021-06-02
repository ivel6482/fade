import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { useHistory } from 'react-router-dom'

//TODO: Refactor this component, extract the dashboard layout to a different component.

export default function BarbershopDetails() {
	const { id } = useParams()
	const history = useHistory()
	const { loading, errors, barbershop, getBarbershop } =
		useContext(BarbershopsContext)

	useEffect(() => {
		getBarbershop(id)
	}, [])

	//TODO: Fetch barbers that have the barbershopId of the selected barbershop

	return (
		<section>
			{loading ? (
				<p>Loading barbershop...</p>
			) : (
				<section>
					<h2 className='font-bold text-gray-200 text-7xl'>
						{barbershop?.name}
					</h2>
					<section>
						<p>{barbershop?.location?.address}</p>
					</section>
				</section>
			)}
		</section>
	)
}
