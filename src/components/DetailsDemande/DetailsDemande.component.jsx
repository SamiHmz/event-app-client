import React from "react";
import { Tabs } from "antd";
import { DetailsDemandeContainer } from "./DetailsDemande.styles";
import DetailsValidationDemande from "../DetailsValidationDemande/DetailsValidationDemande.component";
import DetailsDemandeInfo from "../DetailsDemandeInfo/DetailsDemandeInfo.component";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const DetailsDemande = () => {
  return (
    <DetailsDemandeContainer>
      <Tabs onChange={callback} type="card" size="large">
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
