import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest"; 
import NewBlogForm from "./NewBlogForm";

test("calls createBlog with the right details when a new blog is submitted", () => {
  const createBlog = vi.fn();

  const { getByPlaceholderText, getByText } = render(<NewBlogForm createBlog={createBlog} />);

  fireEvent.change(getByPlaceholderText("Title"), { target: { value: "Test Title" } });

  fireEvent.change(getByPlaceholderText("Author"), { target: { value: "Test Author" } });

  fireEvent.change(getByPlaceholderText("URL"), { target: { value: "http://testurl.com" } });

  fireEvent.submit(getByText(/create/i));

  expect(createBlog).toHaveBeenCalledTimes(1);
  
  expect(createBlog).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "http://testurl.com",
  });
});
