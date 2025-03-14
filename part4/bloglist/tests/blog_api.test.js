const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let token = ''

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('testpassword', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpassword' })
  
  token = loginResponse.body.token
})

describe('Blog API tests', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('A valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'http://example.com/test-blog',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(1)
    expect(blogsAtEnd[0].title).toBe('Test Blog')
  })

  test('A blog cannot be added without a token', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Jane Doe',
      url: 'http://example.com/unauthorized',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(1)
  })

  test('A blog without "likes" defaults to 0', async () => {
    const newBlog = {
      title: 'No Likes Blog',
      author: 'Jane Doe',
      url: 'http://example.com/no-likes'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('A blog without title and url is not added', async () => {
    const newBlog = { author: 'No Title' }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(2)
  })

  test('Deleting a blog works', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(1)
  })

  test('Updating a blog works', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate._doc, likes: 99 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    expect(response.body.likes).toBe(99)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})
