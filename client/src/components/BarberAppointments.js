import DashboardLayout from './DashboardLayout'
import Stats from '../components/Stats'

export default function BarberAppointments() {
	return (
		<DashboardLayout currentTab='appointments'>
			<Stats />
			<p>Barber Appointments</p>
		</DashboardLayout>
	)
}
