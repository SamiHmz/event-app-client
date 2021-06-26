import React from "react";
import { Alert } from "antd";

const FormErorr = ({ error, touched }) => {
  return error && touched ? (
    <Alert message={error} type="error" showIcon />
  ) : null;
};

export default FormErorr;
