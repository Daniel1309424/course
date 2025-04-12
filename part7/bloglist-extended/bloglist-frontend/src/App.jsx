import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import loginService from "./services/login";
import blogService from "./services/blogs";
import userService from "./services/users";
import { useNotification } from "./contexts/NotificationContext";
import { useUser } from "./contexts/UserContext";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogView from "./components/BlogView";
import './styles.css';

const App = () => {
  const { state: notificationState, dispatch: notificationDispatch } = useNotification();
  const { state: userState, dispatch: userDispatch } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userState.user) {
      blogService.getAll().then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      });

      userService.getAll().then((users) => {
        setUsers(users);
      });
    }
  }, [userState.user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({ username, password });

      userDispatch({
        type: "SET_USER",
        user: {
          username: loggedInUser.username,
          name: loggedInUser.name,
          token: loggedInUser.token,
          id: loggedInUser.id,
        },
      });

      setUsername("");
      setPassword("");

      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: "Login successful!",
        messageType: "success",
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    } catch (error) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: "Wrong credentials, please try again.",
        messageType: "error",
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser");
    userDispatch({ type: "LOGOUT" });

    notificationDispatch({
      type: "SET_NOTIFICATION",
      message: "Logged out successfully.",
      messageType: "success",
    });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 3000);
  };

  const handleBlogSubmit = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog);
      const updatedBlogs = [...blogs, addedBlog];
      updatedBlogs.sort((a, b) => b.likes - a.likes);

      setBlogs(updatedBlogs);

      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: "Blog added successfully!",
        messageType: "success",
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    } catch (error) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: "Failed to add blog.",
        messageType: "error",
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    };
  };

  const likeBlog = async (id) => {
    const updatedBlog = await blogService.update(id);
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog));
  };

  if (!userState.user) {
    return (
      <div className="login-container">
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div className="form-group">
            Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button className="btn-login" type="submit">Login</button>
        </form>

        <Notification message={notificationState.message} type={notificationState.type} />
      </div>
    );
  };

  return (
    <Router>
      <div className="app-container">
        <h2>blogs</h2>
        <p>{userState.user.name} logged in</p>

        <button className="btn-logout" onClick={handleLogout}>Logout</button>

        <Notification message={notificationState.message} type={notificationState.type} />

        <BlogForm handleBlogSubmit={handleBlogSubmit} />

        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs}
            user={userState.user || {}}
            likeBlog={likeBlog}
          />
        ))}
      </div>
    </Router>
  );
};

export default App;
