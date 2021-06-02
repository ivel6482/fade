import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { useHistory } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import BarbershopDetails from '../components/BarbershopDetails'

export default function Barbershop() {
	const { isAuthenticated } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/login')
		}
	}, [history, isAuthenticated])

	return (
		<DashboardLayout>
			<BarbershopDetails />
		</DashboardLayout>
	)
}
