import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/blogs">Blogs</Link>
    </nav>
  );
};

export default Navigation;
