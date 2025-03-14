require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/bloglist'
const PORT = process.env.PORT || 3003

module.exports = { MONGO_URL, PORT }
