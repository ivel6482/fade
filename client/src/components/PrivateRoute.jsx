import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../store/contexts/userContext'

export const RequireAuth = ({ children, redirectTo = "/login" }) => {
	const { user, isAuthenticated } = useContext(UserContext)
	return user && isAuthenticated ? children : <Navigate to={redirectTo} />;
}
