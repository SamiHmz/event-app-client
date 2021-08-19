import { apiUrl } from "../config";
import axios from "./axios";

export const getDashboardData = async () => {
  return await axios.get(`${apiUrl}/dashboard/`);
};
