const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const path = require('path')

const barbershopRoutes = require('./routes/barbershops')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const barberRoutes = require('./routes/barbers')
const appointmentRoutes = require('./routes/appointments')

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/barbershops', barbershopRoutes)
app.use('/api/v1/barbers', barberRoutes)
app.use('/api/v1/appointments', appointmentRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server running in PORT ${PORT}`)
})
