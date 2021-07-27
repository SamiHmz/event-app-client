import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import {
  intervenantValidationsSelector,
  isValidationLoadingSelector,
} from "../../redux/intervenant/intervenant.selectors";
import { DetailsValidationContainer } from "../DetailsValidationDemande/DetailsValidationDemande.styles";
import {
  startIntervenantValidationFetching,
  startDeleteIntervenantValidation,
} from "../../redux/intervenant/intervenant.actions";
import IntervenantValidationFom from "../IntervenantValidationFom/IntervenantValidationFom.component";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import { initiateurColumns } from "./detailsValidationDemandeColumns";
import Actions from "../Actions/Actions.component";
import RenderTable from "../RenderTable/RenderTable.component";
import { getColumn } from "../../util/usefull_functions";

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
    ...initiateurColumns,
    {
      title: "Action",
      key: "action",
      render: ({ key, administrateur_id }) => {
        return administrateur_id === user.id ? (
          <Actions
            onDelete={startDeleteIntervenantValidation}
            onEdit={handleEdit}
            title="validation"
            id={key}
          />
        ) : null;
      },
    },
  ];

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
        <IntervenantValidationFom
          visible={visible}
          onCancel={() => setVisible(false)}
          id={id}
          validationId={validationId}
          setValidationId={setValidationId}
        />
      </RenderFormAndButton>
      <RenderTable
        isLoading={isValidationLoading}
        data={intervenantValidations}
        columns={getColumn(user, administrateurColumns, initiateurColumns)}
        isValidation={true}
      />
    </DetailsValidationContainer>
  );
};
export default DetailsValidationIntervenant;
