const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

if (process.env.PORT === 'development') {
	app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server running in PORT ${PORT}`)
})
