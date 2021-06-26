import axios from "axios";
import { toast } from "react-toastify";
import { message } from "antd";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

// global config
message.config({
  top: 60,
  maxCount: 1,
  duration: 10,
});

const config = {
  content:
    "Sorry unexpected error happened check your network connection and retry again",
  maxCount: 1,
};
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // message.error(config);

    toast.error(
      "Sorry unexpected error happened check your network connection and retry again ",
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
