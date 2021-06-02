import { Link } from 'react-router-dom'
import {
	PhoneIcon,
	HeartIcon,
	LocationMarkerIcon,
	ArrowRightIcon,
} from '@heroicons/react/solid'

import BarbershopItem from './BarbershopItem' //TODO: Rename this better

//TODO: Make responsive
export default function Barbershop({ barbershop }) {
	return (
		<section className='col-span-1 p-4'>
			<section className='p-4 space-y-2 text-gray-700 transition bg-gray-100 border border-gray-100 rounded-md shadow hover:shadow-md hover:border-gray-300'>
				<section className='flex justify-between'>
					<p className='font-semibold text-gray-900'>{barbershop?.name}</p>
					<button className='flex items-center space-x-1 font-semibold transition hover:text-red-500'>
						<span>{barbershop.favoriteCount}</span>{' '}
						<HeartIcon width='20' className='' />
					</button>
				</section>
				<BarbershopItem
					icon={<LocationMarkerIcon width='20' className='text-gray-400' />}
					text={barbershop.location.address}
				/>
				<BarbershopItem
					icon={<PhoneIcon width='20' className='text-gray-400' />}
					text={barbershop.contact.phoneNumber}
				/>
				<section className='flex justify-end'>
					<Link
						to={`/barbershops/${barbershop._id}`}
						className='flex items-end gap-2 font-semibold text-gray-500 transition hover:text-gray-900'
					>
						See appointments <ArrowRightIcon width='20' />
					</Link>
				</section>
			</section>
		</section>
	)
}
