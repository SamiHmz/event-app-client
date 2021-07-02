import React from "react";
import NavBar from "../../components/NavBar/NavBar.component";
import {
  MainContainer,
  MainContainerRight,
  MainContainerRightBottom,
} from "./Main.styles";
import { Route, Switch } from "react-router-dom";
import DemandeEvenement from "../../components/DemandeEvenement/DemandeEvenement.component";
import AntSideBare from "../../components/AntSideBare/AntSideBare.component";
import DetailsDemande from "../../components/DetailsDemande/DetailsDemande.component";

const Dashboard = () => <h1>i'am dashboard</h1>;
const Main = () => {
  return (
    <MainContainer>
      <AntSideBare />
      <MainContainerRight>
        <NavBar />
        <MainContainerRightBottom>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/demandes/:id" component={DetailsDemande} />
            <Route exact path="/demandes" component={DemandeEvenement} />
          </Switch>
        </MainContainerRightBottom>
      </MainContainerRight>
    </MainContainer>
  );
};

export default Main;
