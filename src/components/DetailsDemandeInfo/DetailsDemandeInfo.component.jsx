import React from "react";
import { Descriptions } from "antd";
import { useSelector } from "react-redux";
import { getOneDemandeSelector } from "../../redux/evenement/evenement.selectors";

const DetailsDemandeInfo = (props) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="Intitulé" span={3}>
        Salon de l'emploi
      </Descriptions.Item>
      <Descriptions.Item label="Type" span={3}>
        Salon
      </Descriptions.Item>
      <Descriptions.Item label="Mode" span={3}>
        Presentiel
      </Descriptions.Item>
      <Descriptions.Item label="Lieu" span={3}>
        Ecole superieur D'informatique
      </Descriptions.Item>
      <Descriptions.Item label="Date De Crèation" span={3}>
        2021-07-01T11:07:55.753Z
      </Descriptions.Item>
      <Descriptions.Item label="Date Debut" span={3}>
        2021-07-01T11:07:55.753Z
      </Descriptions.Item>
      <Descriptions.Item label="Date Fin" span={3}>
        2021-07-01T11:07:55.753Z
      </Descriptions.Item>
      <Descriptions.Item label="Etat" span={3}>
        aprouvè
      </Descriptions.Item>
      <Descriptions.Item label="Objectifs" span={3}>
        Des objectifs
      </Descriptions.Item>
      <Descriptions.Item label="Programe" span={3}>
        Programe
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailsDemandeInfo;
