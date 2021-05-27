import { useContext, useEffect } from 'react'
import { UserContext } from '../store/contexts/userContext'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
	const { user } = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (!user) {
			history.push('/login')
		}
	}, [history, user])

	// const {
	// 	user: { _id, firstName, lastName, email },
	// } = JSON.parse(user)
	const { _id, firstName, lastName, email } = JSON.parse(user)

	return (
		<>
			<section>
				<h1>Dashboard</h1>
				<p>id: {_id}</p>
				<p>
					Name: {firstName} {lastName}
				</p>
				<p>Email: {email}</p>
			</section>
		</>
	)
}
