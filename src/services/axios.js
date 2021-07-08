import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../redux/store";

store.subscribe(listener);
function select(state) {
  return state.user.token;
}

function listener() {
  let token = select(store.getState());
  axios.defaults.headers.common["x-auth-token"] = token;
}

// global config

export const toastConfig = {
  position: "top-center",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error(
      "Sorry unexpected error happened check your network connection and retry again ",

      toastConfig
    );
  }
  return Promise.reject(error);
});

export default axios;
