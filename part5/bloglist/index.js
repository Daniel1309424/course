const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users') 
const { config } = require('dotenv')

config()

const app = express()

console.log("Connecting to MongoDB...")

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(error => {
    console.error("❌ MongoDB connection error:", error.message)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter) 

const PORT = process.env.PORT || 3003
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
