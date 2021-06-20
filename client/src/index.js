import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './store/contexts/userContext'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'
import { NotificationProvider } from './store/contexts/notificationsContext'
import { BarbersProvider } from './store/contexts/barberContext'

ReactDOM.render(
	<React.StrictMode>
		<NotificationProvider>
			<UserProvider>
				<BarbershopsProvider>
					<BarbersProvider>
						<App />
					</BarbersProvider>
				</BarbershopsProvider>
			</UserProvider>
		</NotificationProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
