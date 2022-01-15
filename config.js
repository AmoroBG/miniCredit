const dotenv = require("dotenv")

// LOAD CONFIG
dotenv.config({ path: "./server/config/config.env" })

const sendGridApiKey = process.env.SENDGRID_API_KEY
const dbURL = process.env.DATABASE_URL
const config = {
    sendGridApiKey, dbURL
}
module.exports = config