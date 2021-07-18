import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Form, Input, DatePicker } from "antd";
import FormErorr from "../FormError/FormError.componenet";
import SelectInput from "../SelectInput/SelectInput.component";
import {
  startCreateDemande,
  startUpdateDemande,
} from "../../redux/evenement/evenement.actions";
import { useDispatch } from "react-redux";
import { typeEvenement, modeEvenement } from "../../util/magic_strings";
import { getOneDemande } from "../../services/evenement.services";
import moment from "moment";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const evenementSchema = Yup.object().shape({
  intitulé: Yup.string().required().label("Intitulé"),
  lieu: Yup.string().required().label("Lieu"),
  objectifs: Yup.string().required().label("Objectifs"),
  programe: Yup.string().required().label("Programe"),
  type: Yup.string().required().label("Type"),
  mode: Yup.string().required().label("Mode"),
  fin: Yup.date().required().label("Date debut et date fin"),
});

const EvenementForm = ({ visible, onCancel, onCreate, id, setId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,

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
    onSubmit: (values) => {
      // .replace(/\n/g, "<br/>");
      values.objectifs
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, " ");
      console.log(values.objectifs);
      if (!id) {
        dispatch(
          startCreateDemande({
            demande: values,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      } else {
        dispatch(
          startUpdateDemande({
            demande: values,
            id: id,
            setErrors,
            closeForm: onCancel,
            resetForm: form.resetFields,
          })
        );
      }
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
    setValues,
  } = formik;

  useEffect(() => {
    if (!id) return;
    const getDemandeInfo = async (demandeID) => {
      try {
        const { data: demande } = await getOneDemande(demandeID);
        setValues({
          intitulé: demande.intitulé,
          type: demande.type,
          lieu: demande.lieu,
          mode: demande.mode,
          debut: demande.debut,
          fin: demande.fin,
          objectifs: demande.objectifs,
          programe: demande.programe,
        });

        form.setFieldsValue({
          intitulé: demande.intitulé,
          type: demande.type,
          lieu: demande.lieu,
          mode: demande.mode,
          pick: [moment(demande.debut), moment(demande.fin)],
          objectifs: demande.objectifs,
          programe: demande.programe,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getDemandeInfo(id);
  }, []);

  const handlCloseForm = () => {
    if (id) form.resetFields();
    setId(null);
    onCancel();
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
          label="Intitulé de l'évènement"
          name="intitulé"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <Input placeholder="Veuillez ajouter l'intitulé" key="intitulé" />
        </Form.Item>
        <FormErorr error={errors.intitulé} touched={touched.intitulé} />
        <Form.Item label="Type de l'évènement" name="type">
          <SelectInput
            options={typeEvenement}
            onChange={(value) => setFieldValue("type", value)}
            placeholder="Veuillez sélectionner un type"
            onBlur={() => setFieldTouched("type", true)}
          />
        </Form.Item>
        <FormErorr error={errors.type} touched={touched.type} />

        <Form.Item label="Mode de l'évènement" name="mode">
          <SelectInput
            options={modeEvenement}
            onChange={(value) => setFieldValue("mode", value)}
            placeholder="Veuillez sélectionner un mode"
            onBlur={() => setFieldTouched("mode", true)}
          />
        </Form.Item>
        <FormErorr error={errors.mode} touched={touched.mode} />
        <Form.Item name="debut" label="Date debut - Date fin" name="pick">
          <RangePicker
            onChange={(value) => {
              setFieldValue("debut", value?.[0]._d || "");
              setFieldValue("fin", value?.[1]._d || "");
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
      </Form>
    </Modal>
  );
};

export default EvenementForm;
