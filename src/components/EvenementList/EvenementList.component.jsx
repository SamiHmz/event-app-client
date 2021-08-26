import React from "react";
import { Card, Descriptions, Image } from "antd";
import { baseUrl } from "../../config";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const EvenementList = ({ evenements }) => {
  return evenements.map((evenement) => {
    return (
      <Card
        key={evenement.id}
        hoverable
        style={{ width: 320, marginRight: 20 }}
        cover={
          <div>
            <Carousel
              infiniteLoop={true}
              showThumbs={false}
              autoPlay={true}
              showStatus={false}
            >
              {evenement.bilans[0].bilan_photos.map((photo) => {
                return (
                  <Image
                    src={baseUrl + photo.lien}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                );
              })}
            </Carousel>
          </div>
        }
      >
        <Descriptions size="small">
          <Descriptions.Item label="Intitulé" span={3}>
            {evenement.intitulé}
          </Descriptions.Item>
          <Descriptions.Item label="Type" span={3}>
            {evenement.type}
            {}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="Lieu" span={3}>
            {evenement.lieu}
          </Descriptions.Item>
          <Descriptions.Item label="Date" span={3}>
            {moment(evenement.debut).format("MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Participant Interne" span={3}>
            {evenement.bilans[0].participants_intern}
          </Descriptions.Item>
          <Descriptions.Item label="Participant Externe" span={3}>
            {evenement.bilans[0].participants_extern}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  });
};
export default EvenementList;
