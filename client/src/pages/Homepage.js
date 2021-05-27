import { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import { UserContext } from '../store/contexts/userContext'
import { useHistory } from 'react-router-dom'

export default function Homepage() {
	const { user, isAuthenticated } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (user && isAuthenticated) {
			history.push('/dashboard')
		}
	}, [history, isAuthenticated, user])

	return (
		<>
			<Hero />
		</>
	)
}
