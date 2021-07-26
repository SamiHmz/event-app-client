import React, { useEffect } from "react";
import { DetailsContainer } from "../DetailsDemande/DetailsDemande.styles";
import { Tabs } from "antd";
import { setIntervenantIsOpened } from "../../services/intervenant.services";
import { useParams } from "react-router-dom";
import { userSelector } from "../../redux/user/user.selectors";
import { useSelector } from "react-redux";
import { typeUtilisateur } from "../../util/magic_strings";
import DetailsIntervenantInfo from "../DetailsIntervenantInfo/DetailsIntervenantInfo.component";
import DetailsValidationIntervenant from "../DetailsValidationIntervenant/DetailsValidationIntervenant.component";
const { TabPane } = Tabs;

const DetailsIntervenant = () => {
  const { id } = useParams();
  const { type } = useSelector(userSelector);

  useEffect(() => {
    if (type !== typeUtilisateur.ADMINISTRATEUR) return;
    const setIsOpened = async (id, isOpened) => {
      try {
        await setIntervenantIsOpened(id, isOpened);
      } catch (error) {
        console.log(error);
      }
    };
    setIsOpened(id, true);
    return () => setIsOpened(id, false);
  });

  return (
    <DetailsContainer>
      <Tabs type="card" size="large">
        <TabPane tab="Details de l'intervenant" key="1">
          <DetailsIntervenantInfo />
        </TabPane>
        <TabPane tab="Details de la validation" key="2">
          <DetailsValidationIntervenant />
        </TabPane>
      </Tabs>
    </DetailsContainer>
  );
};
export default DetailsIntervenant;
