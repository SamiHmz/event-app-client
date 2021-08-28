import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Modal, Form, Input, Upload, Button, Select } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import { modeSponsoring } from "../../util/magic_strings";
import { UploadOutlined } from "@ant-design/icons";
import { baseUrl } from "../../config";
import { removeFile } from "../../services/file-upload.services";
import { getAllNotHappenedEvent } from "../../services/evenement.services";
import { getOneSponsoring } from "../../services/sponsoring.services";
import {
  startCreateSponsoring,
  startUpdateSponsoring,
} from "../../redux/sponsoring/sponsoring.actions";
import { useDispatch } from "react-redux";
const { Option } = Select;
const uploadUrl = baseUrl + "upload/";

const sponsoringSchema = Yup.object().shape({
  type: Yup.string().required().label("Type"),
  montant: Yup.number().required().label("Montant"),
  dossier: Yup.string().label("Dossier Sponsoring"),
  sponsor: Yup.string().required().label("Dossier Sponsoring"),
  evenement_id: Yup.number().required().label("Evenement"),
});

const SponsoringForm = ({ visible, onCancel, id, setId }) => {
  const [evenementsList, setEvenementList] = useState([]);
  const isEditing = !!id;
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
      montant: "",
      type: "",
      dossier: "",
      evenement_id: "",
      sponsor: "",
    },

    validationSchema: sponsoringSchema,
    onSubmit: (values) => {
      if (!isEditing) {
        dispatch(
          startCreateSponsoring({
            sponsoring: values,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateSponsoring({
            sponsoring: values,
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
    }
    if (!isEditing) {
      if (values["dossier"]) deleteFileInServer("photo");
    }
    onCancel();
  };

  const setFileUrlInForm = (file, field) => {
    if (file.percent === 100 && file.response?.url) {
      setFieldValue(field, file.response.url);
    }
    // in case of deleting
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
    const getSponsoringInfo = async (sponsoringId) => {
      try {
        const { data: sponsoring } = await getOneSponsoring(sponsoringId);
        const values = {
          type: sponsoring.type,
          montant: sponsoring.montant,
          dossier: sponsoring.dossier,
          sponsor: sponsoring.sponsor,
          evenement_id: sponsoring.evenement.id,
        };
        console.log("values are :", values);
        setValues(values);
        form.setFieldsValue(values);
      } catch (error) {
        console.log(error);
      }
    };

    getSponsoringInfo(id);
  }, []);

  return (
    <Modal
      visible={visible}
      title={
        isEditing ? "Modifier sponsoring" : "Ajouter  un nouveau sponsoring"
      }
      okText={isEditing ? "Enregistrer" : "Ajouter"}
      cancelText="Annulé"
      onCancel={handlCloseForm}
      onOk={handleSubmit}
    >
      <Form onFinish={handleSubmit} size="large" layout="vertical" form={form}>
        <Form.Item
          label="Sponsor"
          name="sponsor"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input placeholder="Veuillez ecrire le sponsor " key="sponsor" />
        </Form.Item>
        <FormErorr error={errors.sponsor} touched={touched.sponsor} />
        <Form.Item
          label="Montant"
          name="montant"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le montant de sponsoring"
            key="montant"
          />
        </Form.Item>
        <FormErorr error={errors.montant} touched={touched.montant} />
        <Form.Item label="Type " name="type">
          <SelectInput
            options={modeSponsoring}
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
        <Form.Item label="dossier " name="dossier">
          <Upload
            onClick={() => setFieldTouched("dossier", true)}
            listType="text"
            maxCount={1}
            accept=".pdf"
            action={uploadUrl}
            onChange={({ file }) => {
              setFileUrlInForm(file, "dossier");
            }}
            onRemove={() => deleteFileInServer("dossier")}
          >
            <Button icon={<UploadOutlined />}>Upload dossier</Button>
          </Upload>
        </Form.Item>
        <FormErorr error={errors.dossier} touched={touched.dossier} />
        <FormErorr error={errors.server} touched={true} />
      </Form>
    </Modal>
  );
};
export default SponsoringForm;
