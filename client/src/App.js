import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Homepage} />
				<Route path='/signup' component={Signup} />
			</Switch>
		</Router>
	)
}
