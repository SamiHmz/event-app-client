import React from "react";
import Chart from "react-apexcharts";
import { etat, colors } from "../../util/magic_strings";
import {
  Dot,
  EtatCointainer,
  DashboardCardContainer,
  CardTitle,
} from "./DashboardCard.styles";

const DashboardCard = ({ title, cardData }) => {
  var data = {
    options: {
      enabled: true,
      legend: {
        show: false,
      },
      colors: [colors.orange, colors.green, colors.red],
      labels: [etat.ATENTE, etat.APROUVER, etat.REJETER],
    },
  };

  return (
    <DashboardCardContainer>
      <div>
        <CardTitle>{title}</CardTitle>
        <div>
          {" "}
          <EtatCointainer>
            <Dot color={colors.orange} />
            <div>
              {etat.ATENTE}
              {":  "}
              {cardData[etat.ATENTE]}
            </div>
          </EtatCointainer>
          <EtatCointainer>
            <Dot color={colors.green} />
            <div>
              {etat.APROUVER}
              {":  "}
              {cardData[etat.APROUVER]}
            </div>
          </EtatCointainer>
          <EtatCointainer>
            <Dot color={colors.red} />
            <div>{etat.REJETER}</div>
            {":  "}
            {cardData[etat.REJETER]}
          </EtatCointainer>
        </div>
      </div>
      <div>
        <Chart
          options={data.options}
          series={Object.values(cardData)}
          labels={data.labels}
          type="donut"
          style={{
            width: "200px",
            height: "100px",
          }}
        />
      </div>
    </DashboardCardContainer>
  );
};
export default DashboardCard;
