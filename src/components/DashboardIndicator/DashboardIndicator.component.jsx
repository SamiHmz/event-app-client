import React from "react";
import { ReactComponent as Event } from "../../img/event.svg";
import {
  IndicatorIcon,
  IndicatorContainer,
  IndicatorTitle,
  IndicatorValue,
} from "./DashboardIndicator.styles";
import { CardTitle } from "../DashboardCard/DashboardCard.styles";

const DashboardIndicator = ({ icon, title, value }) => {
  console.log(icon);
  return (
    <IndicatorContainer>
      <div>
        <IndicatorTitle>{title}</IndicatorTitle>
        <IndicatorValue>{value}</IndicatorValue>
      </div>
      <IndicatorIcon src={icon} />
    </IndicatorContainer>
  );
};
export default DashboardIndicator;
