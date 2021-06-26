import React from "react";
import LoginForm from "../components/LoginForm/LoginForm.component";

const Login = (props) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
