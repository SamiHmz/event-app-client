import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Form, Input, Radio, Select, DatePicker } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import { startCreateDemande } from "../../redux/evenement/evenement.actions";
import { useDispatch } from "react-redux";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const typeEvenement = [
  "Exposition",
  "Salon",
  "Confèrence",
  "Workshop",
  "Formation",
  "Visit",
  "Compètision",
];

const modeEvenement = ["Prèsentiel", "En Ligne"];

const evenementSchema = Yup.object().shape({
  intitulé: Yup.string().required().label("Intitulé"),
  lieu: Yup.string().required().label("Intitulé"),
  objectifs: Yup.string().required().label("Objectifs"),
  programe: Yup.string().required().label("Programe"),
  type: Yup.string().required().label("Type"),
  mode: Yup.string().required().label("Mode"),
  fin: Yup.date().required().label("Date debut et date fin"),
});

const EvenementForm = ({ visible, onCancel, onCreate }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      intitulé: "",
      type: "",
      lieu: "",
      mode: "",
      debut: "",
      fin: "",
      objectifs: "",
      programe: "",
    },
    validationSchema: evenementSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        startCreateDemande({
          demande: values,
          setErrors,
          closeForm: onCancel,
          resetForm,
        })
      );
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
      title="Créer un nouvel événement"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form onFinish={handleSubmit} size="large" layout="vertical">
        <Form.Item
          label="Intitulé de l'évènement"
          name="intitulé"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input placeholder="Veuillez ajouter l'intitulé" />
        </Form.Item>
        <FormErorr error={errors.intitulé} touched={touched.intitulé} />
        <Form.Item label="Type de l'évènement">
          <SelectInput
            options={typeEvenement}
            onChange={(value) => setFieldValue("type", value)}
            placeholder="Veuillez sélectionner un type"
            onBlur={() => setFieldTouched("type", true)}
          />
        </Form.Item>
        <FormErorr error={errors.type} touched={touched.type} />

        <Form.Item label="Mode de l'évènement">
          <SelectInput
            options={modeEvenement}
            onChange={(value) => setFieldValue("mode", value)}
            placeholder="Veuillez sélectionner un mode"
            onBlur={() => setFieldTouched("mode", true)}
          />
        </Form.Item>
        <FormErorr error={errors.mode} touched={touched.mode} />
        <Form.Item name="debut" label="Date debut - Date fin">
          <RangePicker
            onChange={(value) => {
              setFieldValue("debut", value[0]._d);
              setFieldValue("fin", value[1]._d);
            }}
            onBlur={() => setFieldTouched("fin", true)}
          />
        </Form.Item>
        <FormErorr error={errors.fin} touched={touched.fin} />
        <Form.Item
          label="Lieu de l'évènement"
          name="lieu"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input placeholder="Veuillez ajouter le lieu de l'evenement" />
        </Form.Item>
        <FormErorr error={errors.lieu} touched={touched.lieu} />
        <Form.Item
          label="Objectifs"
          name="objectifs"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <TextArea
            rows={4}
            placeholder="Veuillez ajouter les objectis de votre évènement"
          />
        </Form.Item>
        <FormErorr error={errors.objectifs} touched={touched.objectifs} />

        <Form.Item
          label="Programe"
          name="programe"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <TextArea
            rows={4}
            placeholder="Veuillez ajouter le program de votre évènement"
          />
        </Form.Item>
        <FormErorr error={errors.programe} touched={touched.programe} />

        <FormErorr error={errors.server} touched={true} />
        <button onClick={() => resetForm()}>reset form</button>
      </Form>
    </Modal>
  );
};

export default EvenementForm;
