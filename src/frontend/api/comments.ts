import axios from "axios";
import API_URL from "./index";
import type { Comment } from "../validator/comments";

export const getComments = async (blogId: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/blogs/${blogId}/comments`);

  return response.data;
};

export const createComment = async ({
  blogId,
  authorId,
  content,
}: {
  blogId: number;
  authorId: number;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/blogs/${blogId}/comments`, {
    content,
    author_id: authorId,
    blog_id: blogId,
  });

  return response.data;
};

export const deleteComment = async ({
  commentId,
  userId,
}: {
  commentId: number;
  userId: number;
}) => {
  const response = await axios.delete(
    `${API_URL}/comments/${commentId}?user_id=${userId}`,
  );

  return response.data;
};
