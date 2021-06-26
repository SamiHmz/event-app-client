import { apiUrl } from "../config";
import axios from "./axios";

export const login = async (type, user) => {
  const { data: token } = await axios.post(`${apiUrl}login/${type}`, user);
  return token;
};
