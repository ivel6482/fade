const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const connectDB = require('./config/db')

const barbershopRoutes = require('./routes/barbershops')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB()

if (process.env.PORT === 'development') {
	app.use(morgan('dev'))
}

app.use('/api/v1/barbershops', barbershopRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server running in PORT ${PORT}`)
})
