import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Space, Popconfirm } from "antd";
import { Delete, Edit } from "../Icons/icons";

import Etat from "../Etat/Etat.component";
import { useParams } from "react-router-dom";
import { startDemandeValidationFetching } from "../../redux/evenement/evenement.actions";
import {
  demandeValidationSelector,
  demandeValidationIsLoadingSelector,
} from "../../redux/evenement/evenement.selectors";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { DetailsValidationDemandeContainer } from "./DetailsValidationDemande.styles";
import DemandeValidationForm from "../DemandeValidationForm/DemandeValidationForm.component";

const initiateurColumns = [
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
];

const buttonStyles = {
  width: "20%",
  alignSelf: "flex-end",
  marginBottom: "30px",
};

const DetailsValidationDemande = () => {
  const [visible, setVisible] = useState(false);
  const [validationId, setValidationId] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(demandeValidationIsLoadingSelector);
  const demandesValidation = useSelector(demandeValidationSelector);
  const user = useSelector(userSelector);

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
            onConfirm={""}
          >
            <Delete title="Suprimer la demande " />
          </Popconfirm>
          <Edit title="Modifier la demande " onClick={() => handleEdit(key)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(startDemandeValidationFetching(id));
  }, []);

  const getColumns = () => {
    return user.type === typeUtilisateur.INITIATEUR
      ? initiateurColumns
      : administrateurColumns;
  };

  const handleEdit = (id) => {
    setValidationId(id);
    setVisible(true);
  };
  return (
    <DetailsValidationDemandeContainer>
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
          {visible ? (
            <DemandeValidationForm
              visible={visible}
              onCancel={() => setVisible(false)}
              id={id}
              validationId={validationId}
              setValidationId={setValidationId}
            />
          ) : null}
        </>
      )}
      {isLoading ? (
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
          dataSource={demandesValidation}
        />
      )}
    </DetailsValidationDemandeContainer>
  );
};

export default DetailsValidationDemande;
