import React from "react";
import { useFormik } from "formik";
import { Input, Button, Radio, Form } from "antd";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { typeUtilisateur } from "../../util/magic_strings";

import { loginStart } from "../../redux/user/user.actions";
import FormErorr from "../FormError/FormError.componenet";
import useWindowSize from "../../hooks/useWindowSize";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const { INITIATEUR, ADMINISTRATEUR } = typeUtilisateur;

const btnStyles = { alignSelf: "center" };

const LoginForm = () => {
  const dispatch = useDispatch();
  const { width: windowWidth } = useWindowSize();
  const formWidth = windowWidth > 600 ? "500px" : "300px";
  const formStyles = {
    width: formWidth,
    display: "flex",
    flexDirection: "column",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      type: INITIATEUR,
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ type, email, password }) => {
      dispatch(loginStart({ type, email, password, setErrors }));
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setErrors,
    errors,
    touched,
  } = formik;

  return (
    <Form
      onFinish={handleSubmit}
      size="large"
      layout="vertical"
      style={formStyles}
    >
      <Form.Item
        label="Email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <Input />
      </Form.Item>
      <FormErorr error={errors.email} touched={touched.email} />
      <Form.Item
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <Input.Password />
      </Form.Item>
      <FormErorr error={errors.password} touched={touched.password} />
      <Form.Item label="Type">
        <Radio.Group
          onChange={({ target }) => setFieldValue("type", target.value)}
          value={values.type}
        >
          <Radio value={INITIATEUR}>{INITIATEUR}</Radio>
          <Radio value={ADMINISTRATEUR}>{ADMINISTRATEUR}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item style={btnStyles}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!!Object.keys(errors).length}
        >
          Se Connecter
        </Button>
      </Form.Item>
      <FormErorr error={errors.server} touched={true} />
    </Form>
  );
};

export default LoginForm;
