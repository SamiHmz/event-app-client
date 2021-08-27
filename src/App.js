import React, { useEffect } from "react";
import Login from "./pages/Login/Login.page";
import Main from "./pages/Main/Main.page";
//
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "./redux/user/user.selectors";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./redux/user/user.actions";
import { ToastContainer } from "react-toastify";
import useWindowSize from "./hooks/useWindowSize";
//
import "react-toastify/dist/ReactToastify.css";
import "./App.less";

const toastStyle = { height: "400px", width: "500px", fontSize: "20px" };

const App = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  console.log(windowSize);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        const Currentuser = jwt_decode(token);
        dispatch(setCurrentUser(Currentuser, token));
      }
    }
  }, [user]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {user ? <Main /> : <Login />}
      <ToastContainer limit={1} style={toastStyle} />
    </div>
  );
};

export default App;
