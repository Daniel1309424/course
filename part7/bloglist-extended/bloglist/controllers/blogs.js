const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const tokenExtractor = require('../middleware/tokenExtractor')
const userExtractor = require('../middleware/userExtractor')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
});

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: req.user._id
  });

  const savedBlog = await blog.save()
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  res.status(201).json(populatedBlog)
});

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  };

  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(401).json({ error: 'unauthorized' })
  };

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
});

blogsRouter.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const body = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    },
    { new: true }
  ).populate('user', { username: 1, name: 1 })

  res.json(updatedBlog)
});

module.exports = blogsRouter
