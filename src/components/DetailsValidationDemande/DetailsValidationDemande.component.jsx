import React, { useEffect, useState } from "react";
import { Table, Spin, Button } from "antd";
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
const columns = [
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

  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(demandeValidationIsLoadingSelector);
  const demandesValidation = useSelector(demandeValidationSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(startDemandeValidationFetching(id));
  }, []);
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
          <DemandeValidationForm
            visible={visible}
            onCancel={() => setVisible(false)}
            id={id}
          />
        </>
      )}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
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
