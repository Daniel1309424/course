const express = require('express')
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const user = request.user

  const blog = new Blog({ title, author, url, likes, user: user._id })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'Only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.likes += 1

  const updatedBlog = await blog.save()

  response.json(updatedBlog)
})

module.exports = blogsRouter
