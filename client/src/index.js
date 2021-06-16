import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './store/contexts/userContext'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'
import { NotificationProvider } from './store/contexts/notificationsContext'

ReactDOM.render(
	<React.StrictMode>
		<NotificationProvider>
			<UserProvider>
				<BarbershopsProvider>
					<App />
				</BarbershopsProvider>
			</UserProvider>
		</NotificationProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
