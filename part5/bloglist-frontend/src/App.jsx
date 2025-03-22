import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      });
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({ username, password });

      setUser({
        username: loggedInUser.username,
        name: loggedInUser.name,
        token: loggedInUser.token,
        id: loggedInUser.id,
      });

      setUsername("");
      setPassword("");

      setNotification({
        message: "Login successful!",
        type: "success",
      });

      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    } catch (error) {
      setNotification({
        message: "Wrong credentials, please try again.",
        type: "error",
      });

      setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser");
    setUser(null);

    setNotification({
      message: "Logged out successfully.",
      type: "success",
    });

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleBlogSubmit = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog);

      const updatedBlogs = [...blogs, addedBlog];
      updatedBlogs.sort((a, b) => b.likes - a.likes);

      setBlogs(updatedBlogs);

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Notification message={notification.message} type={notification.type} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <Notification message={notification.message} type={notification.type} />
      <BlogForm handleBlogSubmit={handleBlogSubmit} />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
