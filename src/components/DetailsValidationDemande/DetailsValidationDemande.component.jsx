import React, { useEffect, useState } from "react";

import RenderTable from "../RenderTable/RenderTable.component";

import { useParams } from "react-router-dom";
import {
  startDemandeValidationFetching,
  startDeleteValidation,
} from "../../redux/evenement/evenement.actions";
import {
  demandeValidationSelector,
  demandeValidationIsLoadingSelector,
} from "../../redux/evenement/evenement.selectors";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { DetailsValidationContainer } from "./DetailsValidationDemande.styles";
import DemandeValidationForm from "../DemandeValidationForm/DemandeValidationForm.component";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import Actions from "../Actions/Actions.component";
import { initiateurColumns } from "./detailsValidationDemandeColumns";
import { getColumn } from "../../util/usefull_functions";

const buttonStyles = {
  alignSelf: "flex-end",
  marginBottom: "30px",
};
const buttonPhoneSyles = {
  alignSelf: "center",
  marginTop: "30px",
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
    ...initiateurColumns,
    {
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Actions
          onDelete={startDeleteValidation}
          onEdit={handleEdit}
          title="validation"
          id={key}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(startDemandeValidationFetching(id));
  }, [id]);

  const handleEdit = (id) => {
    setValidationId(id);
    setVisible(true);
  };
  return (
    <DetailsValidationContainer>
      <RenderFormAndButton
        visible={visible}
        setVisible={setVisible}
        type={typeUtilisateur.ADMINISTRATEUR}
        content="validation"
        buttonStyles={buttonStyles}
      >
        <DemandeValidationForm
          visible={visible}
          onCancel={() => setVisible(false)}
          id={id}
          validationId={validationId}
          setValidationId={setValidationId}
        />
      </RenderFormAndButton>
      <RenderTable
        isLoading={isLoading}
        data={demandesValidation}
        columns={getColumn(user, administrateurColumns, initiateurColumns)}
        isValidation={true}
      />
    </DetailsValidationContainer>
  );
};

export default DetailsValidationDemande;
