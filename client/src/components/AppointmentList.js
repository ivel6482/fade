import { useContext } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { EmojiSadIcon } from '@heroicons/react/outline'

export default function AppointmentList() {
	const { appointments } = useContext(BarbershopsContext)
	return (
		<div>
			<h2>These are my current appointments</h2>
			{appointments.length === 0 ? (
				<section>
					<p>
						Sorry, I do not have any more appointments today. Come back
						tomorrow!
					</p>
					<EmojiSadIcon width='50' className='text-indigo-400' />
				</section>
			) : (
				<section>Lista de citas</section>
			)}
		</div>
	)
}
