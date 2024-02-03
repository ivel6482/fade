const mongoose = require('mongoose')

const connectDB = async () => {
	const connectionString = process.env.MONGO_URI

	try {
		const conn = await mongoose.connect(connectionString);

		console.log(`Database connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB
