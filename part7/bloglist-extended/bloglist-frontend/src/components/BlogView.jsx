import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    blogService.getById(id).then((blog) => setBlog(blog));
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const updatedBlog = await blogService.comment(id, newComment);
    setBlog(updatedBlog);
    setNewComment("");
  };

  if (!blog) {
    return null;
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>

      <h3>Comments</h3>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add comment</button>
      </form>

      <ul>
        {blog.comments && blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
