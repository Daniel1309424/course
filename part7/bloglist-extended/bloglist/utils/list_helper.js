const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    return blogs.reduce((favorite, current) => {
      return current.likes > favorite.likes ? current : favorite
    })
  }
  
  const mostBlogs = (blogs) => {
    const authorBlogCounts = {}
  
    blogs.forEach(blog => {
      authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0) + 1
    })

    const mostBlogsAuthor = Object.entries(authorBlogCounts).reduce((max, [author, count]) => {
      return count > max.count ? { author, blogs: count } : max
    }, { author: null, blogs: 0 })
  
    return mostBlogsAuthor
  }

  const mostLikes = (blogs) => {
    const authorLikes = {}

    blogs.forEach(blog => {
      authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
    })

    const mostLikesAuthor = Object.entries(authorLikes).reduce((max, [author, likes]) => {
      return likes > max.likes ? { author, likes } : max
    }, { author: null, likes: 0 })
  
    return mostLikesAuthor
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes  
  }
  