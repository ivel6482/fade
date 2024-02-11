import { Navigate } from 'react-router-dom'
import { useIsAuthenticated, useUser } from "../store/authStore"

export const RequireAuth = ({ children, redirectTo = "/login" }) => {
	const user = useUser();
	const isAuthenticated = useIsAuthenticated();

	return user && isAuthenticated ? children : <Navigate to={redirectTo} />;
}
