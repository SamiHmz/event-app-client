import React, { useEffect } from "react";
import { Descriptions, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startOneDemandeFetching } from "../../redux/evenement/evenement.actions";
import {
  currentDemandeIsLoadingSelector,
  currentDemandeSelector,
} from "../../redux/evenement/evenement.selectors";

const DetailsDemandeInfo = (props) => {
  const isLoading = useSelector(currentDemandeIsLoadingSelector);
  const currentDemande = useSelector(currentDemandeSelector);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startOneDemandeFetching(id));
  }, [id]);

  const transforTextToList = (text) => {
    return (
      <ul style={{ padding: "0" }}>
        {text.split("\n").map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };
  return isLoading ? (
    <Spin />
  ) : (
    <Descriptions bordered>
      <Descriptions.Item label="Intitulé" span={3}>
        {currentDemande.intitulé}
      </Descriptions.Item>
      <Descriptions.Item label="Type" span={3}>
        {currentDemande.type}
      </Descriptions.Item>
      <Descriptions.Item label="Mode" span={3}>
        {currentDemande.mode}
      </Descriptions.Item>
      <Descriptions.Item label="Lieu" span={3}>
        {currentDemande.lieu}
      </Descriptions.Item>
      <Descriptions.Item label="Date De Crèation" span={3}>
        {currentDemande.createdAt}
      </Descriptions.Item>
      <Descriptions.Item label="Date Debut" span={3}>
        {currentDemande.debut}
      </Descriptions.Item>
      <Descriptions.Item label="Date Fin" span={3}>
        {currentDemande.fin}
      </Descriptions.Item>
      <Descriptions.Item label="Etat" span={3}>
        {currentDemande.etat}
      </Descriptions.Item>
      {/* <Descriptions.Item
        label="Objectifs"
        span={3}
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {currentDemande.objectifs}
      </Descriptions.Item> */}
      <Descriptions.Item label="Objectifs" span={3}>
        {transforTextToList(currentDemande.objectifs)}
      </Descriptions.Item>
      <Descriptions.Item label="Programe" span={3}>
        {transforTextToList(currentDemande.programe)}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailsDemandeInfo;
