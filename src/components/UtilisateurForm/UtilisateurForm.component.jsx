import React, { useEffect, useState } from "react";
import _ from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Modal, Form, Input, Upload, Button, Select } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import { typeInitiateur } from "../../util/magic_strings";
import { UploadOutlined } from "@ant-design/icons";
import { baseUrl } from "../../config.json";
import { removeFile } from "../../services/file-upload.services";
import { getOneUtilisateur } from "../../services/utilisateur.services";
import {
  startCreateUtilisateur,
  startUpdateUtilisateur,
} from "../../redux/utilisateur/utilisateur.actions";
import { useDispatch } from "react-redux";
const { Option } = Select;
const uploadUrl = baseUrl + "upload/";

const generaleSchema = {
  nom: Yup.string().required().label("Nom"),
  email: Yup.string().required().label("Email"),
  telephone: Yup.number().required().label("Telephone"),
  type: Yup.string().required().label("Type"),
  photo: Yup.string().label("Photo"),
};

const utilisateurCreateSchema = Yup.object().shape({
  ...generaleSchema,
  password: Yup.string().required().label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const utilisateurEditSchema = Yup.object().shape({
  ...generaleSchema,
  password: Yup.string().label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const UtilisateurForm = ({ visible, onCancel, id, setId }) => {
  const dispatch = useDispatch();
  const isEditing = !!id;

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      nom: "",
      email: "",
      telephone: "",
      type: "",
      password: "",
      photo: "",
    },

    validationSchema: isEditing
      ? utilisateurEditSchema
      : utilisateurCreateSchema,
    onSubmit: (values) => {
      const realValues = _.omit(values, ["passwordConfirmation"]);

      if (!isEditing) {
        dispatch(
          startCreateUtilisateur({
            utilisateur: realValues,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateUtilisateur({
            utilisateur: realValues,
            id: id,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      }
    },
  });
  const [form] = Form.useForm();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldTouched,
    values,
    setFieldValue,
    setErrors,
    errors,
    touched,
    setValues,
  } = formik;

  const handlCloseForm = () => {
    if (isEditing) {
      form.resetFields();
      setId(null);
    } else {
      if (values["photo"]) deleteFileInServer("photo");
    }
    onCancel();
  };

  const setFileUrlInForm = (file, field) => {
    if (file.percent === 100 && file.response?.url) {
      setFieldValue(field, file.response.url);
    }
    if (values[field]) {
      setFieldValue(field, "");
    }
  };

  const deleteFileInServer = async (field) => {
    try {
      const fileUrl = values[field];
      await removeFile(fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isEditing) return;
    const getUtilisateurInfo = async (utilisateurId) => {
      try {
        const { data: utilisateur } = await getOneUtilisateur(utilisateurId);
        const values = {
          nom: utilisateur.nom,
          email: utilisateur.email,
          telephone: utilisateur.telephone,
          type: utilisateur.type,
          photo: utilisateur.photo,
        };
        setValues(values);
        form.setFieldsValue(values);
      } catch (error) {
        console.log(error);
      }
    };

    getUtilisateurInfo(id);
  }, []);

  return (
    <Modal
      visible={visible}
      title="Créer un nouvel événement"
      okText="Create"
      cancelText="Cancel"
      onCancel={handlCloseForm}
      onOk={handleSubmit}
    >
      <Form onFinish={handleSubmit} size="large" layout="vertical" form={form}>
        <Form.Item
          label="Nom"
          name="nom"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le nom de l'utilisateur"
            key="nom"
          />
        </Form.Item>
        <FormErorr error={errors.nom} touched={touched.nom} />
        <Form.Item
          label="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le email de l'utilisateur"
            key="email"
          />
        </Form.Item>
        <FormErorr error={errors.email} touched={touched.email} />

        <Form.Item
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input.Password
            placeholder="Veuillez ecrire le password de l'utilisateur"
            key="password"
          />
        </Form.Item>
        <FormErorr error={errors.password} touched={touched.password} />
        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input.Password
            placeholder="Veuillez confirmer le password de l'utilisateur"
            key="passwordConfirmation"
          />
        </Form.Item>
        <FormErorr
          error={errors.passwordConfirmation}
          touched={touched.passwordConfirmation}
        />
        <Form.Item
          label="Telephone"
          name="telephone"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le telephone de l'utilisateur"
            key="telephone"
          />
        </Form.Item>
        <FormErorr error={errors.telephone} touched={touched.telephone} />
        <Form.Item label="Type " name="type">
          <SelectInput
            options={typeInitiateur}
            onChange={(value) => setFieldValue("type", value)}
            placeholder="Veuillez sélectionner le type"
            onBlur={() => setFieldTouched("type", true)}
          />
        </Form.Item>
        <FormErorr error={errors.type} touched={touched.type} />
        <Form.Item label="Photo " name="photo">
          <Upload
            onClick={() => setFieldTouched("photo", true)}
            listType="picture"
            maxCount={1}
            accept="image/*"
            action={uploadUrl}
            onChange={({ file }) => {
              setFileUrlInForm(file, "photo");
            }}
            onRemove={() => deleteFileInServer("photo")}
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>
        <FormErorr error={errors.photo} touched={touched.photo} />
        <FormErorr error={errors.server} touched={true} />
      </Form>
    </Modal>
  );
};
export default UtilisateurForm;
