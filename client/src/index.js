import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './store/contexts/userContext'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<BarbershopsProvider>
				<App />
			</BarbershopsProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
