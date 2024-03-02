import { DashboardLayout } from '../components/DashboardLayout'
import { Barber } from '../components/Barber'
import { useBarbers } from "../queries/barberQueries";

export const AdminBarbers = () => {
	const { data: barbers, isPending } = useBarbers();

	return (
		<DashboardLayout currentTab='barbers'>
			<h3 className='text-6xl font-bold text-gray-200 lg:text-7xl'>Barbers</h3>
			{isPending ? (
				<p>Loading barbers...</p>
			) : (
				<>
					<ul className='grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4'>
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
