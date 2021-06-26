import React from "react";
import NavBar from "../../components/NavBar/NavBar.component";
import {
  MainContainer,
  MainContainerRight,
  MainContainerRightBottom,
} from "./Main.styles";
import SideBare from "../../components/sideBare/SideBare.component";
import { Route, Switch } from "react-router-dom";
import Evenements from "../../components/Evenements/Evenements.component";
import AntSideBare from "../../components/AntSideBare/AntSideBare.component";
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
            <Route path="/demandes" component={Evenements} />
          </Switch>
        </MainContainerRightBottom>
      </MainContainerRight>
    </MainContainer>
  );
};

export default Main;
