import React, { useEffect } from "react";
import DashboardCard from "../DashboardCard/DashboardCard.component";
import { DashboardAdministrateurContainer } from "./DashboardAdministrateur.styles";
import Chart from "react-apexcharts";
import { getChartData, getTotal } from "../../util/usefull_functions";
import DashboardIndicator from "../DashboardIndicator/DashboardIndicator.component";
import Event from "../../img/event.svg";
import Conference from "../../img/conference.svg";
import Money from "../../img/money-bag.svg";
import useWindowSize from "../../hooks/useWindowSize";
const DashboardAdministrateur = ({ data }) => {
  var { width: windowWidth } = useWindowSize();
  var chartsWidth = windowWidth > 700 ? "500px" : "300px";
  var [nbEvenementcategories, nbEvenementdataSeries] = getChartData(
    data.nb_evenement
  );
  var [budgetCategories, budgetDataSeries] = getChartData(data.budget);
  var nbEvenementoptions = {
    xaxis: {
      categories: nbEvenementcategories,
    },
    title: {
      text: "Nombre d'évenement par initiateur",
      margin: 10,
    },
  };
  var nbEvenemtSeries = [
    {
      name: "Nb évenement par club",
      data: nbEvenementdataSeries,
    },
  ];

  var budgetOptions = {
    xaxis: {
      categories: budgetCategories,
    },

    title: {
      text: "Budget par initiateur",
      margin: 10,
    },
  };

  var budgetSeries = [
    {
      name: "Budget par club",
      data: budgetDataSeries,
    },
  ];

  return (
    <DashboardAdministrateurContainer>
      <DashboardIndicator
        icon={Event}
        title="Nombre d'Evenement"
        value={getTotal(data.nb_evenement)}
      ></DashboardIndicator>
      <DashboardIndicator
        icon={Conference}
        title="Nombre d'Intervenant "
        value={data.intervenants.approuvé}
      ></DashboardIndicator>
      <DashboardIndicator
        icon={Money}
        title="Budget Consomé"
        value={getTotal(data.budget)}
      ></DashboardIndicator>
      <DashboardCard title="Demandes" cardData={data.demandes} />
      <DashboardCard title="Intervenant" cardData={data.intervenants} />
      <DashboardCard title="Sponsoring" cardData={data.sponsorings} />
      <DashboardCard title="Bilan " cardData={data.bilans} />
      <Chart
        options={nbEvenementoptions}
        series={nbEvenemtSeries}
        type="bar"
        width={chartsWidth}
        style={{ marginTop: "50px" }}
      />
      <Chart
        options={budgetOptions}
        series={budgetSeries}
        type="bar"
        width={chartsWidth}
        style={{ marginTop: "50px" }}
      />
    </DashboardAdministrateurContainer>
  );
};

export default DashboardAdministrateur;
