import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { BarbershopsContext } from '../store/contexts/barbershopsContext'
import { useHistory } from 'react-router-dom'
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import BarbershopDetailSection from './BarbershopDetailSection'

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
			{loading && !barbershop ? (
				<p>Loading barbershop...</p>
			) : (
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
								<div className='flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4'>
									<button
										type='button'
										className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
									>
										<MailIcon
											className='w-5 h-5 mr-2 -ml-1 text-gray-400'
											aria-hidden='true'
										/>
										<span>Message</span>
									</button>
									<button
										type='button'
										className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
									>
										<PhoneIcon
											className='w-5 h-5 mr-2 -ml-1 text-gray-400'
											aria-hidden='true'
										/>
										<span>Call</span>
									</button>
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
							<LocationMarkerIcon width='20' />
						</span>{' '}
						{barbershop?.location?.address}
					</p>
				</section>
			</BarbershopDetailSection>
			<BarbershopDetailSection title='Barbers' barbershop={barbershop}>
				<section className='p-3 bg-gray-100 border rounded'>
					<p>Barber name</p>
				</section>
			</BarbershopDetailSection>
		</section>
	)
}
