import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, FieldArray } from "formik";
import { Modal, Form, Input, Upload, Button, Select } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import { UploadOutlined } from "@ant-design/icons";
import { baseUrl } from "../../config.json";
import { removeFile } from "../../services/file-upload.services";
import { getAllNotHappenedEvent } from "../../services/evenement.services";
import { getOneBilan } from "../../services/bilan.services";
import {
  startCreateBilan,
  startUpdateBilan,
} from "../../redux/bilan/bilan.actions";
import { useDispatch } from "react-redux";
const { Option } = Select;
const uploadUrl = baseUrl + "upload/";
const { TextArea } = Input;

const bilanSchema = Yup.object().shape({
  article: Yup.string().label("Article"),
  ppt_presentation: Yup.string().label("Power point presentation"),
  participants_intern: Yup.number().required().label("Participant Interne"),
  participants_extern: Yup.number().label("Participant Externe"),
  problem: Yup.string().label("Dossier Bilan"),
  evenement_id: Yup.number().required().label("Evenement"),
  photo: Yup.array().required().of(Yup.string().min(1)),
});

const BilanForm = ({ visible, onCancel, id, setId }) => {
  const [evenementsList, setEvenementList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getEvenementlist = async () => {
      try {
        const { data } = await getAllNotHappenedEvent();
        setEvenementList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvenementlist();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      article: "",
      ppt_presentation: "",
      participants_intern: "",
      participants_extern: "",
      evenement_id: "",
      problem: "",
      photo: [""],
    },

    validationSchema: bilanSchema,
    onSubmit: (values) => {
      console.log(values);
      if (!id) {
        dispatch(
          startCreateBilan({
            bilan: values,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateBilan({
            bilan: values,
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
    if (values["dossier"]) deleteFileInServer("photo");
    onCancel();
  };

  const setFileUrlInForm = (file, field) => {
    if (file.percent === 100 && file.response?.url) {
      if (field === "photo") {
        setFieldValue(field, [...photos, baseUrl + file.response.url]);
        setPhotos([...photos, baseUrl + file.response.url]);
      } else {
        setFieldValue(field, baseUrl + file.response.url);
      }
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
    const getBilanInfo = async (bilanId) => {
      try {
        const { data: bilan } = await getOneBilan(bilanId);
        const values = {
          article: bilan.article,
          ppt_presentation: bilan.ppt_presentation,
          participants_intern: bilan.participants_intern,
          participants_extern: bilan.participants_extern,
          evenement_id: bilan.evenement_id,
          problem: bilan.problem,
        };
        console.log("values are :", values);
        setValues(values);
        form.setFieldsValue(values);
      } catch (error) {
        console.log(error);
      }
    };

    getBilanInfo(id);
  }, []);

  const handleUploadMultiple = async () => {
    // await setFieldValue("photo", photos);
    console.log(values.photo);
  };

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
          label="Participant Interne"
          name="participants_intern"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez ecrire le nombre des participants interne "
            key="participants_intern"
          />
        </Form.Item>
        <FormErorr
          error={errors.participants_intern}
          touched={touched.participants_intern}
        />
        <Form.Item
          label="Participant Externe"
          name="participants_extern"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input
            placeholder="Veuillez entrer le nombre des participants externe "
            key="participants_extern"
          />
        </Form.Item>
        <FormErorr
          error={errors.participants_extern}
          touched={touched.participants_extern}
        />
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
        <Form.Item
          label="Power point de la presentation "
          name="ppt_presentation"
        >
          <Upload
            onClick={() => setFieldTouched("ppt_presentation", true)}
            listType="text"
            maxCount={1}
            accept=".pptx"
            action={uploadUrl}
            onChange={({ file }) => {
              setFileUrlInForm(file, "ppt_presentation");
            }}
            onRemove={() => deleteFileInServer("ppt_presentation")}
          >
            <Button icon={<UploadOutlined />}>
              Upload power point presentation
            </Button>
          </Upload>
        </Form.Item>
        <FormErorr
          error={errors.ppt_presentation}
          touched={touched.ppt_presentation}
        />
        <Form.Item
          label="Article"
          name="article"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <TextArea
            rows={4}
            placeholder="Veuillez ajouter un de votre évènement"
          />
        </Form.Item>
        <FormErorr error={errors.article} touched={touched.article} />
        <Form.Item
          label="Problems"
          name="problem"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <TextArea
            rows={4}
            placeholder="Veuillez ajouter un de votre évènement"
          />
        </Form.Item>
        <FormErorr error={errors.problem} touched={touched.problem} />
        <Form.Item label="Photo " name="photo">
          <Upload
            // onClick={() => setFieldTouched("photo", true)}
            listType="picture"
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
export default BilanForm;
