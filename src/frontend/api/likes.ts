import axios from "axios";
import API_URL from ".";
import { likeResponseSchema, type LikeResponse } from "../validator/likes";

export const likeBlog = async (
  blogId: number,
  userId: number,
): Promise<LikeResponse> => {
  const response = await axios.post(`${API_URL}/blogs/${blogId}/like`, null, {
    params: {
      user_id: userId,
    },
  });

  return likeResponseSchema.parse(response.data);
};

export const unlikeBlog = async (
  blogId: number,
  userId: number,
): Promise<LikeResponse> => {
  const response = await axios.delete(`${API_URL}/blogs/${blogId}/like`, {
    params: {
      user_id: userId,
    },
  });

  return likeResponseSchema.parse(response.data);
};
