import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setBlogs, setNotification }) => {
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
      setNotification({
        message: "Blog added successfully!",
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    } catch (error) {
      setNotification({
        message: "Failed to add blog.",
        type: "error",
      });
      setTimeout(() => {
        setNotification({ message: "", type: "" });
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
