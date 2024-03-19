const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");

const connectDB = async () => {
	try {
		const connectionString = process.env.POSTGRES_CONNECTION_STRING;

		const client = new Client({ connectionString });

		await client.connect();
		const db = drizzle(client);
		console.log("Database connected");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

module.exports = connectDB;
