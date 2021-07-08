import React, { useState, useEffect } from "react";
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
import windowSize from "react-window-size";
import { Drawer } from "antd";

import axios from "../../services/axios";

const Dashboard = () => <h1>i'am dashboard</h1>;
const Main = ({ windowWidth }) => {
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  //     "token"
  //   );
  //   console.log("excuted");
  // }, []);

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
          </Switch>
        </MainContainerRightBottom>
      </MainContainerRight>
    </MainContainer>
  );
};

export default windowSize(Main);
