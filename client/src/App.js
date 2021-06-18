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

export default function App() {
	const { user } = useContext(UserContext)

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
				<PrivateRoute path='/barbershops/:id'>
					<Barbershop />
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					{user?.role === 'barber' ? (
						<BarberAppointments />
					) : (
						<UserAppointments />
					)}
				</PrivateRoute>
				<PrivateRoute path='/profile'>
					{user?.role === 'barber' ? <BarberProfile /> : <UserProfile />}
				</PrivateRoute>
			</Switch>
			<Notification />
		</Router>
	)
}
