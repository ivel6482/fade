import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { DashboardLayout } from '../components/DashboardLayout'
import { BarbershopDetails } from '../components/BarbershopDetails'
import { useNavigate } from "react-router-dom"

export const Barbershop = () => {
	const { isAuthenticated } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [navigate, isAuthenticated])

	return (
		<DashboardLayout>
			<BarbershopDetails />
		</DashboardLayout>
	)
}
