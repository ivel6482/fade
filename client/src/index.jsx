import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BarbershopsProvider } from './store/contexts/barbershopsContext'
import { NotificationProvider } from './store/contexts/notificationsContext'
import { BarbersProvider } from './store/contexts/barberContext'

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<NotificationProvider>
			<BarbershopsProvider>
				<BarbersProvider>
					<App />
				</BarbersProvider>
			</BarbershopsProvider>
		</NotificationProvider>
	</React.StrictMode>
);
