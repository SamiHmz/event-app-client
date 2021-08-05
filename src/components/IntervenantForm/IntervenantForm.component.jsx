import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Modal, Form, Input, Upload, Button, Select } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import { sexe, typeIntervenant } from "../../util/magic_strings";
import { UploadOutlined } from "@ant-design/icons";
import { baseUrl } from "../../config.json";
import { removeFile } from "../../services/file-upload.services";
import { getAllNotHappenedEvent } from "../../services/evenement.services";
import { getOneIntervenant } from "../../services/intervenant.services";
import {
  startCreateIntervenant,
  startUpdateIntervenant,
} from "../../redux/intervenant/intervenant.actions";
import { useDispatch } from "react-redux";
const { Option } = Select;
const uploadUrl = baseUrl + "upload/";

const intervenantSchema = Yup.object().shape({
  nom: Yup.string().required().label("Nom"),
  prenom: Yup.string().required().label("Prenom"),
  email: Yup.string().required().label("Email"),
  sexe: Yup.string().required().label("Sexe"),
  telephone: Yup.number().required().label("Evenement"),
  type: Yup.string().required().label("Type"),
  photo: Yup.string().required().label("Photo"),
  cv: Yup.string().required().label("Photo"),
  evenement_id: Yup.number().required().label("Evenement"),
});

const IntervenantForm = ({ visible, onCancel, id, setId }) => {
  const [evenementsList, setEvenementList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getEvenementlist = async () => {
      try {
        const { data } = await getAllNotHappenedEvent();
        setEvenementList(data);
        console.log("evenement list", data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvenementlist();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      sexe: "",
      telephone: "",
      type: "",
      photo: "",
      cv: "",
      evenement_id: "",
    },

    validationSchema: intervenantSchema,
    onSubmit: (values) => {
      if (!id) {
        dispatch(
          startCreateIntervenant({
            intervenant: values,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateIntervenant({
            intervenant: values,
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
    handleReset,
    setFieldTouched,
    values,
    setFieldValue,
    setErrors,
    errors,
    touched,
    resetForm,
    setValues,
  } = formik;
  const handlCloseForm = () => {
    if (id) {
      form.resetFields();
      setId(null);
    }
    if (values["photo"] && !id) deleteFileInServer("photo");
    if (values["cv"] && !id) deleteFileInServer("cv");
    onCancel();
  };

  const setFileUrlInForm = (file, field) => {
    if (file.percent === 100 && file.response?.url) {
      setFieldValue(field, baseUrl + file.response.url);
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
    if (!id) return;
    const getIntervenantInfo = async (intervenantId) => {
      try {
        const { data: intervenant } = await getOneIntervenant(intervenantId);
        const values = {
          nom: intervenant.nom,
          prenom: intervenant.prenom,
          email: intervenant.email,
          sexe: intervenant.sexe,
          telephone: intervenant.telephone,
          type: intervenant.type,
          photo: intervenant.photo,
          cv: intervenant.cv,
          evenement_id: intervenant.evenement_id,
        };
        setValues(values);
        form.setFieldsValue(values);
      } catch (error) {
        console.log(error);
      }
    };

    getIntervenantInfo(id);
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
            placeholder="Veuillez ecrire le nom de l'intervenant"
            key="nom"
          />
        </Form.Item>
        <FormErorr error={errors.nom} touched={touched.nom} />
        <Form.Item
          label="Prenom"
          name="prenom"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le prenom de l'intervenant"
            key="prenom"
          />
        </Form.Item>
        <FormErorr error={errors.prenom} touched={touched.prenom} />
        <Form.Item
          label="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le email de l'intervenant"
            key="email"
          />
        </Form.Item>
        <FormErorr error={errors.email} touched={touched.email} />
        <Form.Item
          label="Telephone"
          name="telephone"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le telephone de l'intervenant"
            key="telephone"
          />
        </Form.Item>
        <FormErorr error={errors.telephone} touched={touched.telephone} />
        <Form.Item label="Sexe " name="sexe">
          <SelectInput
            options={sexe}
            onChange={(value) => setFieldValue("sexe", value)}
            placeholder="Veuillez sélectionner le sexe"
            onBlur={() => setFieldTouched("sexe", true)}
          />
        </Form.Item>
        <FormErorr error={errors.sexe} touched={touched.sexe} />
        <Form.Item label="Type " name="type">
          <SelectInput
            options={typeIntervenant}
            onChange={(value) => setFieldValue("type", value)}
            placeholder="Veuillez sélectionner le type"
            onBlur={() => setFieldTouched("type", true)}
          />
        </Form.Item>
        <FormErorr error={errors.type} touched={touched.type} />
        <Form.Item label="Evenement " name="evenement_id">
          <Select
            onChange={(value) => setFieldValue("evenement_id", value)}
            placeholder="Veuillez sélectionner l'évènement"
            onBlur={() => setFieldTouched("evenement_id", true)}
          >
            {evenementsList.map(({ id, intitulé }) => (
              <Option value={id} key={id}>
                {intitulé}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <FormErorr error={errors.evenement_id} touched={touched.evenement_id} />
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
        <Form.Item label="Cv " name="cv">
          <Upload
            onClick={() => setFieldTouched("cv", true)}
            listType="text"
            maxCount={1}
            accept=".pdf"
            action={uploadUrl}
            onChange={({ file }) => {
              setFileUrlInForm(file, "cv");
            }}
            onRemove={() => deleteFileInServer("cv")}
          >
            <Button icon={<UploadOutlined />}>Upload Cv</Button>
          </Upload>
        </Form.Item>
        <FormErorr error={errors.cv} touched={touched.cv} />
        <FormErorr error={errors.server} touched={true} />
      </Form>
    </Modal>
  );
};
export default IntervenantForm;
