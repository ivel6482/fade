import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'

export default function PrivateRoute({ children, ...props }) {
	const { user, isAuthenticated } = useContext(UserContext)
	return (
		<Route
			{...props}
			render={() => {
				return user && isAuthenticated ? children : <Redirect to='/login' />
			}}
		/>
	)
}
