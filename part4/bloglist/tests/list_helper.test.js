const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a71b54a676234d17f9',
      title: 'Turing Award Winner',
      author: 'Alan Turing',
      url: 'https://www.britannica.com/biography/Alan-Turing',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f10',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      url: 'https://en.wikipedia.org/wiki/Design_Patterns',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 22) 
  })

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favoriteBlog', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a71b54a676234d17f9',
      title: 'Turing Award Winner',
      author: 'Alan Turing',
      url: 'https://www.britannica.com/biography/Alan-Turing',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f10',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      url: 'https://en.wikipedia.org/wiki/Design_Patterns',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has many blogs, returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const expected = {
      title: 'Turing Award Winner',
      author: 'Alan Turing',
      likes: 10
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs.slice(0, 1))
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})

describe('mostBlogs', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a71b54a676234d17f9',
      title: 'Turing Award Winner',
      author: 'Alan Turing',
      url: 'https://www.britannica.com/biography/Alan-Turing',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f10',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      url: 'https://en.wikipedia.org/wiki/Design_Patterns',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f11',
      title: 'Refactoring',
      author: 'Robert C. Martin',
      url: 'https://www.amazon.com/Refactoring-Improving-Design-Existing-Software/dp/0134757599',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f12',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
      likes: 12,
      __v: 0
    }
  ]

  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 2
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list is empty, returns an object with author as null and blogs as 0', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, { author: null, blogs: 0 })
  })
})

describe('mostLikes', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a71b54a676234d17f9',
      title: 'Turing Award Winner',
      author: 'Alan Turing',
      url: 'https://www.britannica.com/biography/Alan-Turing',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f10',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      url: 'https://en.wikipedia.org/wiki/Design_Patterns',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f11',
      title: 'Refactoring',
      author: 'Robert C. Martin',
      url: 'https://www.amazon.com/Refactoring-Improving-Design-Existing-Software/dp/0134757599',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422c5a71b54a676234d17f12',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
      likes: 12,
      __v: 0
    }
  ]

  test('returns the author with the most likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    const expected = {
      author: 'Robert C. Martin',
      likes: 27
    }
    assert.deepStrictEqual(result, expected)
  })

  test('when list is empty, returns an object with author as null and likes as 0', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, { author: null, likes: 0 })
  })
})
