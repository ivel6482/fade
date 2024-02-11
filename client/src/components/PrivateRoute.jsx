import { Navigate } from 'react-router-dom'
import { useAuthStore } from "../store/authStore"

export const RequireAuth = ({ children, redirectTo = "/login" }) => {
	const user = useAuthStore(state => state.user);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);

	return user && isAuthenticated ? children : <Navigate to={redirectTo} />;
}
