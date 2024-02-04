import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { BarbershopList } from '../components/BarbershopsList'
import { DashboardLayout } from '../components/DashboardLayout'
import { useNavigate } from "react-router-dom"

export const Barbershops = () => {
	const { isAuthenticated } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [navigate, isAuthenticated])

	return (
		<DashboardLayout>
			<BarbershopList />
		</DashboardLayout>
	)
}
