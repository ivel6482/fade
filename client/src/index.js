import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './store/contexts/userContext'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'
import { NotificationProvider } from './store/contexts/notificationsContext'
import { BarbersProvider } from './store/contexts/barberContext'
import { AdminProvider } from './store/contexts/adminContext'

ReactDOM.render(
	<React.StrictMode>
		<NotificationProvider>
			<AdminProvider>
				<UserProvider>
					<BarbershopsProvider>
						<BarbersProvider>
							<App />
						</BarbersProvider>
					</BarbershopsProvider>
				</UserProvider>
			</AdminProvider>
		</NotificationProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
