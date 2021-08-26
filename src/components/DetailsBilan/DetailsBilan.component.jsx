import React, { useEffect } from "react";
import {
  currentBilanSelector,
  isCurrentBilanLoadingSelector,
} from "../../redux/bilan/bilan.selectors";
import { Descriptions, Spin, Image, Avatar, List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { startOneBilanFetching } from "../../redux/bilan/bilan.actions";
import Etat from "../Etat/Etat.component";
import { File } from "../Icons/icons";
import moment from "moment";
import { baseUrl } from "../../config";
import { DetailsBilanContainer, PhotoContainer } from "./DetailBilan.styles";
const DetailsBilan = () => {
  const isLoading = useSelector(isCurrentBilanLoadingSelector);
  const currentBilan = useSelector(currentBilanSelector);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startOneBilanFetching(id));
  }, [id]);

  const transformText = (text) => {
    return (
      <div style={{ padding: "0" }}>
        {text.split("\n").map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  };
  return isLoading ? (
    <Spin />
  ) : (
    <DetailsBilanContainer>
      <Descriptions bordered>
        <Descriptions.Item label="Evènement" span={3}>
          {currentBilan.evenement.intitulé}
        </Descriptions.Item>
        <Descriptions.Item label="Nombre Participant Interne" span={3}>
          {currentBilan.participants_intern}
        </Descriptions.Item>
        <Descriptions.Item label="Nombre Participant Externe" span={3}>
          {currentBilan.participants_extern}
        </Descriptions.Item>
        <Descriptions.Item label="Etat" span={3}>
          <Etat value={currentBilan.etat}></Etat>
        </Descriptions.Item>
        <Descriptions.Item label="Date de Crèation" span={3}>
          {moment(currentBilan.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>
        <Descriptions.Item label="Présentation Power Point" span={3}>
          <File
            to={baseUrl + currentBilan.ppt_presentation}
            title="Voir présentation "
          />
        </Descriptions.Item>
        <Descriptions.Item label="Article" span={3}>
          {transformText(currentBilan.article)}
        </Descriptions.Item>
        <Descriptions.Item label="Problem" span={3}>
          {transformText(currentBilan.problem)}
        </Descriptions.Item>
        <Descriptions.Item label="Photos" span={3}>
          <List
            grid={{ gutter: 16, column: 10 }}
            dataSource={currentBilan.bilan_photos}
            renderItem={(item) => (
              <List.Item>
                <Avatar
                  key={item.id}
                  src={<Image src={baseUrl + item.lien} />}
                  shape="square"
                  size={64}
                />
              </List.Item>
            )}
          />
          {/* {currentBilan.bilan_photos.map((photo) => {
              return (
                <Avatar
                  key={photo.id}
                  src={<Image src={baseUrl + photo.lien} />}
                  shape="square"
                  size={64}
                />
              );
            })} */}
        </Descriptions.Item>
      </Descriptions>
    </DetailsBilanContainer>
  );
};
export default DetailsBilan;
