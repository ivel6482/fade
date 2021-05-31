import { useContext } from 'react'
import Barbershop from './Barbershop'

export default function BarbershopList() {
	return (
		<section>
			<h3 className='font-bold text-gray-200 text-9xl'>Barbershops</h3>
			<section>
				<Barbershop />
				<Barbershop />
				<Barbershop />
				<Barbershop />
				<Barbershop />
			</section>
		</section>
	)
}
