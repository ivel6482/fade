import { useContext } from 'react'
import { UserContext } from './store/contexts/userContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Barbershops } from './pages/Barbershops'
import { Barbershop } from './pages/Barbershop'
import { RequireAuth } from './components/PrivateRoute'
import { UserAppointments } from './pages/UserAppointments'
import { UserProfile } from './pages/UserProfile'
import { Notification } from './components/Notification'
import { BarberProfile } from './pages/BarberProfile'
import { BarberAppointments } from './pages/BarberAppointments'
import { AdminBarbers } from './pages/AdminBarbers'
import { AdminUsers } from './pages/AdminUsers'
import { AdminAppointments } from './pages/AdminAppointments'
import { AdminUserProfile } from './components/AdminUserProfile'
import { AdminBarbershop } from './pages/AdminBarbershop'
import { AdminNewAppointment } from './components/AdminNewAppointment'
import { AdminBookAppointment } from './components/AdminBookAppointment'
import { AdminNewUser } from './components/AdminNewUser'
import { BarberSignup } from './pages/BarberSignup'
import { NotificationContext } from './store/contexts/notificationsContext'
import { NewBarbershop } from './pages/NewBarbershop'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1_000 * 7
		}
	}
});

export const App = () => {
	const { user } = useContext(UserContext)
	const { notifications } = useContext(NotificationContext)

	const barbershopPage = {
		admin: <AdminBarbershop />,
		barber: <Barbershop />,
		costumer: <Barbershop />,
	}

	const appointmentsPage = {
		admin: <AdminAppointments />,
		barber: <BarberAppointments />,
		costumer: <UserAppointments />,
	}

	const profilePage = {
		admin: <UserProfile />,
		barber: <BarberProfile />,
		costumer: <UserProfile />,
	}

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/signup/barber' element={<BarberSignup />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/dashboard' element={
						<RequireAuth>
							<Barbershops />
						</RequireAuth>
					} />
					<Route path='/barbershops/new' element={
						<RequireAuth>
							<NewBarbershop />
						</RequireAuth>
					} />
					<Route path='/barbershops/:id' element={
						<>
							{barbershopPage[user?.role]}
						</>
					} />
					<Route path='/appointments/new' element={
						<>
							{/* //TODO: Create an access denied screeen and 404 screen */}
							{user?.role === 'admin' ? <AdminNewAppointment /> : <h2>404</h2>}
						</>
					} />
					<Route path='/appointments/book' element={
						<>
							{user?.role === 'admin' ? <AdminBookAppointment /> : <h2>404</h2>}
						</>
					} />
					<Route path='/appointments' element={
						<>
							{appointmentsPage[user?.role]}
						</>
					} />
					<Route path='/profile' element={
						<>
							{profilePage[user?.role]}
						</>
					} />
					<Route path='/barbers' element={
						<>
							{user?.role === 'admin' ? <AdminBarbers /> : <h2>404</h2>}
						</>
					} />
					<Route path='/users/new' element={
						<AdminNewUser />
					} />
					<Route path='/users/:id' element={
						<>
							{user?.role === 'admin' ? <AdminUserProfile /> : <h2>404</h2>}
						</>
					} />
					<Route path='/users' element={
						<>
							{user?.role === 'admin' ? <AdminUsers /> : <h2>404</h2>}
						</>
					} />
				</Routes>
			</BrowserRouter>
			{
				notifications.length > 0 &&
				notifications.map((notification) => (
					<Notification notification={notification} key={notification.id} />
				))
			}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
