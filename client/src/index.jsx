import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'
import { NotificationProvider } from './store/contexts/notificationsContext'
import { BarbersProvider } from './store/contexts/barberContext'
import { AdminProvider } from './store/contexts/adminContext'

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<NotificationProvider>
			<AdminProvider>
				<BarbershopsProvider>
					<BarbersProvider>
						<App />
					</BarbersProvider>
				</BarbershopsProvider>
			</AdminProvider>
		</NotificationProvider>
	</React.StrictMode>
);
