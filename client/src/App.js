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
import AdminAppointments from './pages/AdminAppointments'
import AdminUserProfile from './components/AdminUserProfile'
import AdminBarbershop from './pages/AdminBarbershop'
import AdminNewAppointment from './components/AdminNewAppointment'
import AdminBookAppointment from './components/AdminBookAppointment'
import AdminNewUser from './components/AdminNewUser'
import { NotificationContext } from './store/contexts/notificationsContext'
import NewBarbershop from './pages/NewBarbershop'
import axios from 'axios'

export default function App() {
	const { user } = useContext(UserContext)

	if (process.env.NODE_ENV === 'production') {
		axios.defaults.baseURL = 'https://fadeapp.herokuapp.com/api/v1' // use this in prod along side with "proxy": "https://fadeapp.herokuapp.com/" in package.json
	} else {
		axios.defaults.baseURL = 'http://localhost:5000/api/v1' // use this in dev along side with "proxy": "http://localhost:5000" in package.json
	}

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
					{barbershopPage[user?.role]}
				</PrivateRoute>
				<PrivateRoute path='/appointments/new'>
					{/* //TODO: Create an access denied screeen and 404 screen */}
					{user?.role === 'admin' ? <AdminNewAppointment /> : <h2>404</h2>}
				</PrivateRoute>
				<PrivateRoute path='/appointments/book'>
					{user?.role === 'admin' ? <AdminBookAppointment /> : <h2>404</h2>}
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					{appointmentsPage[user?.role]}
				</PrivateRoute>
				<PrivateRoute path='/profile'>{profilePage[user?.role]}</PrivateRoute>
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
