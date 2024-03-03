import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import {
	PhoneIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
} from '@heroicons/react/24/solid'
import { BarbershopDetailSection } from './BarbershopDetailSection'
import { Barber } from './Barber'
import { useBarbershop, useBarbershopBarbers } from '../queries/barbershopQueries'

//TODO: Refactor this component, extract the dashboard layout to a different component.

export const BarbershopDetails = () => {
	const { id } = useParams();

	const { data: barbershop, isPending: isPendingBarbershop } = useBarbershop(id);
	const { data: barbershopBarbers, isPending: isPendingBarbershopBarbers } = useBarbershopBarbers(id);

	console.log({
		isPendingBarbershop,
		isPendingBarbershopBarbers
	});

	if (isPendingBarbershop || isPendingBarbershopBarbers) {
		return <p>"Loading barbershop..."</p>
	}

	return (
		<section>
			<div>
				<div>
					<img
						className='object-cover w-full h-32 rounded-md lg:h-48'
						src='https://source.unsplash.com/random'
						alt=''
					/>
				</div>
				<div className='max-w-5xl px-4 mx-auto sm:px-6 lg:px-8'>
					<div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
						<div className='flex'>
							<img
								className='w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
								src='https://source.unsplash.com/random'
								alt=''
							/>
						</div>
						<div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
							<div className='flex-1 min-w-0 mt-6 sm:hidden md:block'>
								<h1 className='text-2xl font-bold text-gray-900 truncate'>
									{barbershop?.name}
								</h1>
							</div>
						</div>
					</div>
					<div className='flex-1 hidden min-w-0 mt-6 sm:block md:hidden'>
						<h1 className='text-2xl font-bold text-gray-900 truncate'>
							{barbershop?.name}
						</h1>
					</div>
				</div>
			</div>
			{barbershop.about && (
				<BarbershopDetailSection title='About Us' barbershop={barbershop}>
					<section>
						<p className='flex items-center gap-2'>{barbershop?.about}</p>
					</section>
				</BarbershopDetailSection>
			)}
			<BarbershopDetailSection title='Contact Us' barbershop={barbershop}>
				<section>
					<p className='flex items-center gap-2'>
						<span>
							<PhoneIcon width='20' />
						</span>{' '}
						{barbershop?.contact?.phoneNumber}
					</p>
				</section>
			</BarbershopDetailSection>
			<BarbershopDetailSection title='Location' barbershop={barbershop}>
				<section>
					<p className='flex items-center gap-2'>
						<span>
							<MapPinIcon width='20' />
						</span>{' '}
						{barbershop?.location?.address}
					</p>
				</section>
			</BarbershopDetailSection>
			<BarbershopDetailSection title='Availability' barbershop={barbershop}>
				<section className='space-y-3'>
					<div>
						<p className='flex items-center gap-2'>
							<span>
								<CalendarIcon width='20' />
							</span>{' '}
							{barbershop.available?.days.length === 0
								? 'Barbershop has not provided working days'
								: barbershop.available?.days.length === 7
									? 'All days of the week'
									: barbershop?.available?.days
										.reduce((acc, day) => acc + day + ', ', '')
										.slice(0, -2)}
						</p>
					</div>
					<div>
						<p className='flex items-center gap-2'>
							<span>
								<ClockIcon width='20' />
							</span>{' '}
							{barbershop.available?.hours?.open &&
								barbershop.available?.hours?.close
								? `
							${barbershop.available?.hours.open} - 
							${barbershop.available?.hours.close}
							`
								: 'Barbershop has not provided working hours'}
						</p>
					</div>
				</section>
			</BarbershopDetailSection>

			<BarbershopDetailSection title='Barbers' barbershop={barbershop}>
				{barbershopBarbers.length === 0 ? (
					<p className='text-gray-500 lg:text-lg'>
						This barbershop currently has no barbers.
					</p>
				) : (
					<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4'>
						{barbershopBarbers.map((barber) => (
							<Barber barber={barber} key={barber._id} />
						))}
					</ul>
				)}
			</BarbershopDetailSection>
		</section>
	)
}
