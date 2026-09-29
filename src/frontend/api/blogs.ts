import axios from "axios";
import API_URL from "./index";
import type { BlogResponse, BlogCreate } from "../validator/blogs";

export const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const getUserBlogs = async (userId: number): Promise<BlogResponse[]> => {
  const response = await axios.get(`${API_URL}/users/${userId}/blogs`);
  return response.data;
};

export const createBlog = async ({
  userId,
  blog,
}: {
  userId: number;
  blog: BlogCreate;
}) => {
  const formData = new FormData();

  formData.append("header", blog.header);
  formData.append("content", blog.content);
  formData.append("excerpt", blog.excerpt ?? "");
  formData.append("category", blog.category);

  if (blog.image) {
    formData.append("image", blog.image);
  }

  const response = await axios.post(
    `${API_URL}/users/${userId}/blogs`,
    formData,
  );

  return response.data;
};
