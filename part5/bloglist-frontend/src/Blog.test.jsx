import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./components/Blog";
import { vi } from "vitest";

test("calls the event handler twice when the like button is clicked twice", () => {
  const blog = {
    id: "1",
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: { id: "user1", username: "testuser" },
  };

  const setBlogs = vi.fn();
  const blogs = [];
  const user = { id: "user1", username: "testuser" };

  const likeBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      setBlogs={setBlogs}
      blogs={blogs}
      user={user}
      likeBlog={likeBlog}
    />
  );

  const viewDetailsButton = screen.getByText("View details");
  fireEvent.click(viewDetailsButton);

  const likeButton = screen.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(likeBlog).toHaveBeenCalledTimes(2);
});
