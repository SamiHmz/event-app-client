import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Form, Input } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import * as Yup from "yup";
import { etat } from "../../util/magic_strings";
import { startUpdateValidation } from "../../redux/evenement/evenement.actions";
import {
  startCreateIntervenantValidation,
  startUpdateIntervenantValidation,
} from "../../redux/intervenant/intervenant.actions";
import { useDispatch } from "react-redux";
import { getOneIntervenantValidation } from "../../services/intervenant.services";

const { TextArea } = Input;

const demandeValidationSchema = Yup.object().shape({
  etat: Yup.string().required().label("Décision"),
  details: Yup.string().required().label("Details"),
});
const IntervenantValidationFom = ({
  visible,
  onCancel,
  id,
  validationId,
  setValidationId,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: {
      etat: "",
      details: "",
    },
    validationSchema: demandeValidationSchema,
    onSubmit: (values) => {
      if (!validationId) {
        dispatch(
          startCreateIntervenantValidation({
            validation: {
              ...values,
              intervenant_id: id,
            },
            setErrors,
            onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateIntervenantValidation({
            validation: {
              ...values,
              intervenant_id: id,
            },
            id: validationId,
            setErrors,
            onCancel,
            resetForm: form.resetFields,
          })
        );
        console.log("edit");
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
    handleReset,
    setFieldTouched,
    values,
    setFieldValue,
    setErrors,
    errors,
    touched,
    resetForm,
  } = formik;

  useEffect(() => {
    if (!validationId) return;
    const getValidation = async () => {
      try {
        const { data: validation } = await getOneIntervenantValidation(
          validationId
        );
        setValues({
          etat: validation.etat,
          details: validation.details,
        });
        form.setFieldsValue({
          etat: validation.etat,
          details: validation.details,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getValidation();
  }, []);

  const handleCloseModal = () => {
    form.resetFields();
    setValidationId(null);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Créer une validation"
      okText="Create"
      cancelText="Cancel"
      onCancel={handleCloseModal}
      onOk={handleSubmit}
    >
      <Form onFinish={handleSubmit} size="large" layout="vertical" form={form}>
        <FormErorr error={errors.intitulé} touched={touched.intitulé} />
        <Form.Item label="Décision" name="etat">
          <SelectInput
            options={[etat.APROUVER, etat.REJETER]}
            onChange={(value) => setFieldValue("etat", value)}
            placeholder="Veuillez sélectionner votre décision"
            onBlur={() => setFieldTouched("etat", true)}
          />
        </Form.Item>
        <FormErorr error={errors.etat} touched={touched.etat} />
        <Form.Item
          label="Details"
          name="details"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <TextArea
            rows={4}
            placeholder="Veuillez ajouter les details de votre décision"
          />
        </Form.Item>
        <FormErorr error={errors.details} touched={touched.details} />
        <FormErorr error={errors.server} touched={true} />
      </Form>
    </Modal>
  );
};

export default IntervenantValidationFom;
