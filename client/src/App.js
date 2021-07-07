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
import { NotificationContext } from './store/contexts/notificationsContext'
import NewBarbershop from './pages/NewBarbershop'

export default function App() {
	const { user } = useContext(UserContext)
	const { notifications } = useContext(NotificationContext)

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
				<PrivateRoute>
					<NewBarbershop />
				</PrivateRoute>
				<PrivateRoute path='/barbershops/:id'>
					{user?.role === 'admin' ? <AdminBarbershop /> : <Barbershop />}
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					{user?.role === 'costumer' && <UserAppointments />}
					{user?.role === 'barber' && <BarberAppointments />}
					{user?.role === 'admin' && <AdminAppointments />}
				</PrivateRoute>
				<PrivateRoute path='/profile'>
					{user?.role === 'costumer' && <UserProfile />}
					{user?.role === 'barber' && <BarberProfile />}
					{user?.role === 'admin' && <AdminProfile />}
				</PrivateRoute>
				<PrivateRoute path='/barbers'>
					{user?.role === 'admin' ? <AdminBarbers /> : <h2>404</h2>}
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
