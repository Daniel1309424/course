import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs, user, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const deleteBlog = async () => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}'?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error("Failed to delete the blog", error);
        alert("Failed to delete the blog. Please check your session or token.");
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? "Hide" : "View"} details
        </button>
      </div>

      {showDetails && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button onClick={() => likeBlog(blog.id)}>like</button>
          </p>
          {user && blog.user && user.id === blog.user.id && (
            <button onClick={deleteBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
