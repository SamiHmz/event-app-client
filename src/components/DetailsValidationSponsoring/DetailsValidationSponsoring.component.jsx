import React, { useEffect, useState } from "react";
import { DetailsContainer } from "../DetailsDemande/DetailsDemande.styles";
import { setSponsoringIsOpened } from "../../services/sponsoring.services";
import { useParams } from "react-router-dom";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { useDispatch, useSelector } from "react-redux";
import {
  sponsoringValidationsSelector,
  isValidationLoadingSelector,
} from "../../redux/sponsoring/sponsoring.selectors";
import { DetailsValidationContainer } from "../DetailsValidationDemande/DetailsValidationDemande.styles";
import {
  startSponsoringValidationFetching,
  startDeleteSponsoringValidation,
} from "../../redux/sponsoring/sponsoring.actions";
import SponsoringValidationForm from "../SponsoringValidationForm/SponsoringValidationForm.component";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import { initiateurColumns } from "./detailsValidationDemandeColumns";
import Actions from "../Actions/Actions.component";
import RenderTable from "../RenderTable/RenderTable.component";
import { getColumn } from "../../util/usefull_functions";
import {
  addBeforeCloseHandler,
  removeBeforeCloseHandler,
  removeListenersFromElement,
} from "../../util/usefull_functions";
const DetailsValidationSponsoring = () => {
  const { id } = useParams();
  const { type } = useSelector(userSelector);
  const [visible, setVisible] = useState(false);
  const [validationId, setValidationId] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const sponsoringValidations = useSelector(sponsoringValidationsSelector);
  const isValidationLoading = useSelector(isValidationLoadingSelector);
  const buttonStyles = {
    alignSelf: "flex-end",
    marginBottom: "30px",
  };
  useEffect(() => {
    if (type !== typeUtilisateur.ADMINISTRATEUR) return;
    const setIsOpened = async (id, isOpened) => {
      try {
        await setSponsoringIsOpened(id, isOpened);
      } catch (error) {
        console.log(error);
      }
    };
    setIsOpened(id, true);
    // var cb = () => setIsOpened(id, false);
    // addBeforeCloseHandler(cb);

    return () => {
      setIsOpened(id, false);
      // removeBeforeCloseHandler(cb);
      // // removeListenersFromElement(window, "beforeunload");
    };
  }, []);

  useEffect(() => {
    dispatch(startSponsoringValidationFetching(id));
  }, [id]);

  const administrateurColumns = [
    ...initiateurColumns,
    {
      title: "Action",
      key: "action",
      render: ({ key, administrateur_id }) => {
        return administrateur_id === user.id ? (
          <Actions
            onDelete={startDeleteSponsoringValidation}
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
    <DetailsContainer>
      <DetailsValidationContainer>
        <RenderFormAndButton
          visible={visible}
          setVisible={setVisible}
          type={typeUtilisateur.ADMINISTRATEUR}
          content="validation"
          buttonStyles={buttonStyles}
        >
          <SponsoringValidationForm
            visible={visible}
            onCancel={() => setVisible(false)}
            id={id}
            validationId={validationId}
            setValidationId={setValidationId}
          />
        </RenderFormAndButton>
        <RenderTable
          isLoading={isValidationLoading}
          data={sponsoringValidations}
          columns={getColumn(user, administrateurColumns, initiateurColumns)}
          isValidation={true}
        />
      </DetailsValidationContainer>
    </DetailsContainer>
  );
};
export default DetailsValidationSponsoring;
