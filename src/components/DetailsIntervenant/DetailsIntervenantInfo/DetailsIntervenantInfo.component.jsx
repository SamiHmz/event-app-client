import React, { useEffect } from "react";
import {
  currentIntervenantSelector,
  isCurrentIntervenantLoadingSelector,
} from "../../../redux/intervenant/intervenant.selectors";
import { Descriptions, Spin, Image, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { startOneIntervenantFetching } from "../../../redux/intervenant/intervenant.actions";
import Etat from "../../Etat/Etat.component";
import { File } from "../../Icons/icons";
import moment from "moment";
import { baseUrl } from "../../../config";

const DetailsIntervenantInfo = () => {
  const isLoading = useSelector(isCurrentIntervenantLoadingSelector);
  const currentIntervenant = useSelector(currentIntervenantSelector);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startOneIntervenantFetching(id));
  }, [id]);

  return isLoading ? (
    <Spin />
  ) : (
    <Descriptions bordered>
      <Descriptions.Item label="Photo" span={3}>
        <Avatar
          src={<Image src={baseUrl + currentIntervenant.photo} />}
          shape="square"
          size={64}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Nom" span={3}>
        {currentIntervenant.nom}
      </Descriptions.Item>
      <Descriptions.Item label="Prénom" span={3}>
        {currentIntervenant.prenom}
      </Descriptions.Item>
      <Descriptions.Item label="Evènement" span={3}>
        {currentIntervenant.evenement?.intitulé || "Evènement supprimé"}
      </Descriptions.Item>
      <Descriptions.Item label="Type" span={3}>
        {currentIntervenant.type}
      </Descriptions.Item>
      <Descriptions.Item label="Sexe" span={3}>
        {currentIntervenant.sexe}
      </Descriptions.Item>
      <Descriptions.Item label="Email" span={3}>
        {currentIntervenant.email}
      </Descriptions.Item>
      <Descriptions.Item label="Telephone" span={3}>
        {currentIntervenant.telephone}
      </Descriptions.Item>
      <Descriptions.Item label="Etat" span={3}>
        <Etat value={currentIntervenant.etat}></Etat>
      </Descriptions.Item>
      <Descriptions.Item label="Cv" span={3}>
        <File
          to={baseUrl + currentIntervenant.cv}
          title="Voir le cv de l'intervenant "
        />
      </Descriptions.Item>
      <Descriptions.Item label="Date de Crèation" span={3}>
        {moment(currentIntervenant.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailsIntervenantInfo;
