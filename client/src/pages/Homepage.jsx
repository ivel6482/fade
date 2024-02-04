import { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { UserContext } from '../store/contexts/userContext'
import { Login } from './Login'
import { useNavigate } from "react-router-dom"

export const Homepage = () => {
	const { user, isAuthenticated } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (user && isAuthenticated) {
			navigate('/dashboard')
		}
	}, [navigate, isAuthenticated, user])

	return (
		<Layout>
			<Login />
		</Layout>
	)
}
