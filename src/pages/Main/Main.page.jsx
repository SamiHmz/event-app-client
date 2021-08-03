import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.component";
import {
  MainContainer,
  MainContainerRight,
  MainContainerRightBottom,
} from "./Main.styles";
import DetailsDemande from "../../components/DetailsDemande/DetailsDemande.component";
import Intervenant from "../../components/Intervenant/Intervenant.component";
import DemandeEvenement from "../../components/DemandeEvenement/DemandeEvenement.component";
import DetailsIntervenant from "../../components/DetailsIntervenant/DetailsIntervenant.component";
import DetailsValidationSponsoring from "../../components/DetailsValidationSponsoring/DetailsValidationSponsoring.component";
import Sponsoring from "../../components/Sponsoring/Sponsoring.component";
import { Route, Switch } from "react-router-dom";
import AntSideBare from "../../components/AntSideBare/AntSideBare.component";
import windowSize from "react-window-size";
import { Drawer } from "antd";
import Bilan from "../../components/Bilan/Bilan.component";
import DetailsBilan from "../../components/DetailsBilan/DetailsBilan.component";
import Utilisateur from "../../components/Utilisateur/Utilisateur.component";
const Dashboard = () => <h1>i'am dashboard</h1>;
const Main = ({ windowWidth }) => {
  const [visible, setVisible] = useState(false);

  return (
    <MainContainer>
      {windowWidth < 700 ? (
        <Drawer
          placement="left"
          visible={visible}
          onClose={() => setVisible(false)}
          key="left"
          bodyStyle={{ padding: "0", margin: 0 }}
        >
          <AntSideBare style={{ width: "100%" }} />
        </Drawer>
      ) : (
        <AntSideBare />
      )}

      <MainContainerRight>
        <NavBar onOpen={() => setVisible(true)} />
        <MainContainerRightBottom>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/demandes/:id" component={DetailsDemande} />
            <Route exact path="/demandes" component={DemandeEvenement} />
            <Route
              exact
              path="/intervenants/:id"
              component={DetailsIntervenant}
            />
            <Route exact path="/intervenants" component={Intervenant} />
            <Route
              exact
              path="/sponsorings/:id"
              component={DetailsValidationSponsoring}
            />
            <Route exact path="/sponsorings" component={Sponsoring} />
            <Route exact path="/bilans/:id" component={DetailsBilan} />
            <Route exact path="/bilans" component={Bilan} />
            <Route exact path="/utilisateurs" component={Utilisateur} />
          </Switch>
        </MainContainerRightBottom>
      </MainContainerRight>
    </MainContainer>
  );
};

export default windowSize(Main);
