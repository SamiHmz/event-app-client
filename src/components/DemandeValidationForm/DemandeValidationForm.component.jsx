import React from "react";
import { useFormik } from "formik";
import { Modal, Form, Input } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import * as Yup from "yup";
import { etat } from "../../util/magic_strings";
import { startCreateValidation } from "../../redux/evenement/evenement.actions";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

const demandeValidationSchema = Yup.object().shape({
  etat: Yup.string().required().label("Etat"),
  details: Yup.string().required().label("Details"),
});
const DemandeValidationForm = ({ visible, onCancel, id }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      etat: "",
      details: "",
    },
    validationSchema: demandeValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        startCreateValidation({
          ...values,
          evenement_id: id,
        })
      );
      onCancel();
    },
  });

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
  } = formik;
  return (
    <Modal
      visible={visible}
      title="Créer une validation"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form onFinish={handleSubmit} size="large" layout="vertical">
        <FormErorr error={errors.intitulé} touched={touched.intitulé} />
        <Form.Item label="Type de l'évènement">
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
      </Form>
    </Modal>
  );
};

export default DemandeValidationForm;
