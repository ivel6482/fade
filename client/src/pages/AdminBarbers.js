import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { AdminContext } from '../store/contexts/adminContext'
import Barber from '../components/Barber'
import Stats from '../components/Stats'

export default function AdminBarbers() {
	const { loading, getBarbers, barbers, barbersCount } =
		useContext(AdminContext)

	useEffect(() => {
		getBarbers()
	}, [])

	const stats = [
		{
			name: 'Total Barbers',
			stat: barbersCount,
		},
	]

	return (
		<DashboardLayout currentTab='barbers'>
			<h3 className='font-bold text-gray-300 text-8xl'>Barbers</h3>
			{loading ? (
				<p>Loading barbers...</p>
			) : (
				<>
					<Stats stats={stats} />
					<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{barbers.map((barber) => (
							//TODO: This component has to be more reusable or make a new one exclusively for admins.
							<Barber barber={barber} key={barber._id} />
						))}
					</ul>
				</>
			)}
		</DashboardLayout>
	)
}
