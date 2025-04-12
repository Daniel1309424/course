import { useState } from "react";
import blogService from "../services/blogs";
import { useNotification } from "../contexts/NotificationContext";

const BlogForm = ({ setBlogs }) => {
  const { dispatch } = useNotification();
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      const blogToAdd = { ...newBlog };
      const addedBlog = await blogService.create(blogToAdd);
      setBlogs((blogs) => blogs.concat(addedBlog));
      setNewBlog({ title: "", author: "", url: "" });

      dispatch({
        type: "SET_NOTIFICATION",
        message: "Blog added successfully!",
        messageType: "success",
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    } catch (error) {
      dispatch({
        type: "SET_NOTIFICATION",
        message: "Failed to add blog.",
        messageType: "error",
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <h2>Create a new blog</h2>
      <div>
        Title:
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
