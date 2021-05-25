import { useRouter } from 'next/router'
import { UserContext } from '../store/contexts/userContext'
import { useContext } from 'react'

export default function Dashboard() {
	const {
		user: {
			user: { firstName, lastName, _id, email },
		},
	} = useContext(UserContext)

	return (
		<>
			<h1>Dashboard</h1>
			<p>id: {_id}</p>
			<p>
				Name: {firstName} {lastName}
			</p>
			<p>Email: {email}</p>
		</>
	)
}
