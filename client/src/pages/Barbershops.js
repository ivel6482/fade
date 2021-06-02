import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { useHistory } from 'react-router-dom'
import BarbershopList from '../components/BarbershopsList'
import DashboardLayout from '../components/DashboardLayout'

export default function Barbershops() {
	const { isAuthenticated } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/login')
		}
	}, [history, isAuthenticated])

	return (
		<DashboardLayout>
			<BarbershopList />
		</DashboardLayout>
	)
}
