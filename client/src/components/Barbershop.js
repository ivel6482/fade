import { Link } from 'react-router-dom'
import {
	PhoneIcon,
	LocationMarkerIcon,
	ArrowRightIcon,
} from '@heroicons/react/solid'

import BarbershopItem from './BarbershopItem' //TODO: Rename this better
import { useContext } from 'react'
import { UserContext } from '../store/contexts/userContext'

//TODO: Make responsive
export default function Barbershop({ barbershop }) {
	const { user } = useContext(UserContext)

	return (
		<section className='col-span-1 p-4'>
			<section className='p-4 space-y-2 text-gray-700 transition bg-gray-100 border border-gray-100 rounded-md shadow hover:shadow-md hover:border-blue-900'>
				<section>
					<p className='font-semibold text-gray-900'>{barbershop?.name}</p>
				</section>
				<section className='flex-1 flex-grow h-full'>
					<BarbershopItem
						icon={<LocationMarkerIcon width='20' className='text-gray-400' />}
						text={barbershop.location.address}
					/>
					<BarbershopItem
						icon={<PhoneIcon width='20' className='text-gray-400' />}
						text={barbershop.contact.phoneNumber}
					/>
				</section>
				<section className='flex justify-end'>
					<Link
						to={`/barbershops/${barbershop._id}`}
						className='font-semibold text-gray-500 transition hover:text-gray-900'
					>
						{user?.role === 'admin' ? (
							<span className='flex items-end gap-2'>
								View barbershop <ArrowRightIcon width='20' />
							</span>
						) : (
							<span className='flex items-end gap-2'>
								See appointments <ArrowRightIcon width='20' />
							</span>
						)}
					</Link>
				</section>
			</section>
		</section>
	)
}
