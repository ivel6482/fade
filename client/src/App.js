import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
	return (
		//TODO: handle context migration from next to react
		<Router>
			<Layout>
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/signup' component={Signup} />
					<Route path='/login' component={Login} />
					<Route path='/dashboard' component={Dashboard} />
				</Switch>
			</Layout>
		</Router>
	)
}
