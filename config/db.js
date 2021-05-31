const mongoose = require('mongoose')

const connectDB = async () => {
	const prodUri = process.env.MONGO_URI_PROD
	const devUri = process.env.MONGO_URI_DEV
	try {
		const conn = await mongoose.connect(
			process.env.NODE_ENV === 'development' ? devUri : prodUri,
			{
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		)

		console.log(`Database connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB
