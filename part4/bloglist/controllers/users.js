const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/user')

const usersRouter = express.Router()

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = usersRouter
