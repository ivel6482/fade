import { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../store/contexts/userContext'
import { useHistory } from 'react-router-dom'
import Login from './Login'

export default function Homepage() {
	const { user, isAuthenticated } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (user && isAuthenticated) {
			history.push('/dashboard')
		}
	}, [history, isAuthenticated, user])

	return (
		<Layout>
			<Login />
		</Layout>
	)
}
