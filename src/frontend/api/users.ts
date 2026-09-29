import axios from "axios";
import API_URL from "./index";
import type { UserResponse } from "../validator/users";

export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
