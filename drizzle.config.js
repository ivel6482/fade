const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  schema: "./schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
  }
}
