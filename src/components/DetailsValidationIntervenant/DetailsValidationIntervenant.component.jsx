import React, { useState, useEffect } from "react";
import { Table, Spin, Button, Space, Popconfirm } from "antd";
import { Delete, Edit } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import {
  intervenantValidationsSelector,
  isValidationLoadingSelector,
} from "../../redux/intervenant/intervenant.selectors";
import { DetailsValidationContainer } from "../DetailsValidationDemande/DetailsValidationDemande.styles";
import { startIntervenantValidationFetching } from "../../redux/intervenant/intervenant.actions";

const initiateurColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Validateur",
    dataIndex: "validateur",
    key: "validateur",
  },
  {
    title: "Etat",
    dataIndex: "etat",
    key: "etat",
    render: (etat) => (
      <>
        <Etat value={etat} />
      </>
    ),
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
];
const DetailsValidationIntervenant = () => {
  const [visible, setVisible] = useState(false);
  const [validationId, setValidationId] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const intervenantValidations = useSelector(intervenantValidationsSelector);
  const isValidationLoading = useSelector(isValidationLoadingSelector);
  const buttonStyles = {
    width: "20%",
    alignSelf: "flex-end",
    marginBottom: "30px",
  };

  useEffect(() => {
    dispatch(startIntervenantValidationFetching(id));
  }, [id]);

  const administrateurColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Etat",
      dataIndex: "etat",
      key: "etat",
      render: (etat) => (
        <>
          <Etat value={etat} />
        </>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Space size="middle">
          <Popconfirm
            title="Êtes-vous sûr de supprimer cette demande?"
            okText="Oui"
            cancelText="Non"
            // onConfirm={() =>
            //      dispatch(startDeleteValidation(key))}
          >
            <Delete title="Suprimer la demande " />
          </Popconfirm>
          <Edit
            title="Modifier la demande "
            //   onClick={() => handleEdit(key)}
          />
        </Space>
      ),
    },
  ];

  const getColumns = () => {
    return user.type === typeUtilisateur.INITIATEUR
      ? initiateurColumns
      : administrateurColumns;
  };
  return (
    <DetailsValidationContainer>
      {user.type === typeUtilisateur.INITIATEUR ? null : (
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={buttonStyles}
            onClick={() => {
              setVisible(true);
            }}
          >
            Nouvel Validation
          </Button>
          {/* {visible ? (
            <DemandeValidationForm
              visible={visible}
              onCancel={() => setVisible(false)}
              id={id}
              validationId={validationId}
              setValidationId={setValidationId}
            />
          ) : null} */}
        </>
      )}
      {isValidationLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={getColumns()}
          style={{
            alignSelf: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            maxWidth: "100%",
          }}
          tableLayout="fixed"
          dataSource={intervenantValidations}
        />
      )}
    </DetailsValidationContainer>
  );
};
export default DetailsValidationIntervenant;
