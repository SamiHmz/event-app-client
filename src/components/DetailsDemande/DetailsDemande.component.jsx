import React, { useEffect } from "react";
import { Tabs } from "antd";
import { DetailsDemandeContainer } from "./DetailsDemande.styles";
import DetailsValidationDemande from "../DetailsValidationDemande/DetailsValidationDemande.component";
import DetailsDemandeInfo from "../DetailsDemandeInfo/DetailsDemandeInfo.component";
import { useSelector } from "react-redux";
import { evenementIsLoading } from "../../redux/evenement/evenement.selectors";
import { setDemandeIsOpened } from "../../services/evenement.services";
import { useParams } from "react-router-dom";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
const { TabPane } = Tabs;

const DetailsDemande = () => {
  const { id } = useParams();
  const { type } = useSelector(userSelector);

  useEffect(() => {
    if (type !== typeUtilisateur.ADMINISTRATEUR) return;
    const setIsOpenedState = async (id, isOpened) => {
      try {
        await setDemandeIsOpened(id, isOpened);
      } catch (error) {
        console.log(error);
      }
    };
    setIsOpenedState(id, true);
    return () => setIsOpenedState(id, false);
  });

  return (
    <DetailsDemandeContainer>
      <Tabs type="card" size="large">
        <TabPane tab="Details de la demande" key="1">
          <DetailsDemandeInfo />
        </TabPane>
        <TabPane tab="Details de la validation" key="2">
          <DetailsValidationDemande />
        </TabPane>
      </Tabs>
    </DetailsDemandeContainer>
  );
};

export default DetailsDemande;
