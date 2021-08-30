import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm.component";

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
      <h1>Connectez-vous</h1>
      <LoginForm />
      {/* <h1>gs_hamaizi@esi.dz --- 1234156</h1>
      <h1>dahak@gmail.com --- 123456</h1>
      <h1>yanar@gmail.com --- 123456</h1> */}
    </div>
  );
};

export default Login;
