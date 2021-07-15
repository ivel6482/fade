import { useContext } from 'react'
import { UserContext } from './store/contexts/userContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Barbershops from './pages/Barbershops'
import Barbershop from './pages/Barbershop'
import PrivateRoute from './components/PrivateRoute'
import UserAppointments from './pages/UserAppointments'
import UserProfile from './pages/UserProfile'
import Notification from './components/Notification'
import BarberProfile from './pages/BarberProfile'
import BarberAppointments from './pages/BarberAppointments'
import AdminBarbers from './pages/AdminBarbers'
import AdminUsers from './pages/AdminUsers'
import AdminProfile from './pages/AdminProfile'
import AdminAppointments from './pages/AdminAppointments'
import AdminUserProfile from './components/AdminUserProfile'
import AdminBarbershop from './pages/AdminBarbershop'
import AdminNewAppointment from './components/AdminNewAppointment'
import AdminBookAppointment from './components/AdminBookAppointment'
import AdminNewUser from './components/AdminNewUser'
import { NotificationContext } from './store/contexts/notificationsContext'
import NewBarbershop from './pages/NewBarbershop'

export default function App() {
	const { user } = useContext(UserContext)
	const { notifications } = useContext(NotificationContext)

	const barbershopPage = {
		admin: <AdminBarbershop />,
		barber: <Barbershop />,
		customer: <Barbershop />,
	}

	//TODO: Keep the returns as simple as possible
	return (
		//TODO: handle context migration from next to react
		<Router>
			<Switch>
				<Route path='/' exact component={Homepage} />
				<Route path='/signup' component={Signup} />
				<Route path='/login' component={Login} />
				<PrivateRoute path='/dashboard'>
					<Barbershops />
				</PrivateRoute>
				<PrivateRoute path='/barbershops/new'>
					<NewBarbershop />
				</PrivateRoute>
				<PrivateRoute path='/barbershops/:id'>
					{/* //TODO: Use enums instead of ternaries or logical &&s */}
					{/* {user?.role === 'admin' ? <AdminBarbershop /> : <Barbershop />} */}
					{/* // Use enum to render component based on user.role instead of doing the above */}
					{barbershopPage[user.role]}
				</PrivateRoute>
				<PrivateRoute path='/appointments/new'>
					{user?.role === 'admin' && <AdminNewAppointment />}
				</PrivateRoute>
				<PrivateRoute path='/appointments/book'>
					{user?.role === 'admin' && <AdminBookAppointment />}
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					{user?.role === 'costumer' && <UserAppointments />}
					{user?.role === 'barber' && <BarberAppointments />}
					{user?.role === 'admin' && <AdminAppointments />}
				</PrivateRoute>
				<PrivateRoute path='/profile'>
					{(user?.role === 'costumer' || user?.role === 'admin') && (
						<UserProfile />
					)}
					{user?.role === 'barber' && <BarberProfile />}
					{/* {user?.role === 'admin' && <AdminProfile />} */}
				</PrivateRoute>
				<PrivateRoute path='/barbers'>
					{user?.role === 'admin' ? <AdminBarbers /> : <h2>404</h2>}
				</PrivateRoute>
				<PrivateRoute path='/users/new'>
					<AdminNewUser />
				</PrivateRoute>
				<PrivateRoute path='/users/:id'>
					{user?.role === 'admin' ? <AdminUserProfile /> : <h2>404</h2>}
				</PrivateRoute>
				<PrivateRoute path='/users'>
					{user?.role === 'admin' ? <AdminUsers /> : <h2>404</h2>}
				</PrivateRoute>
			</Switch>
			{notifications.length > 0 &&
				notifications.map((notification) => (
					<Notification notification={notification} key={notification.id} />
				))}
		</Router>
	)
}
