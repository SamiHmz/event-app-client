import { baseUrl } from "../config";
import axios from "./axios";

export const removeFile = async (fileUrl) => {
  return await axios.delete(baseUrl + "remove", {
    data: {
      url: fileUrl,
    },
  });
};
