import React, { useEffect } from "react";
import DashboardCard from "../DashboardCard/DashboardCard.component";
import { DashboardAdministrateurContainer } from "./DashboardAdministrateur.styles";
import Chart from "react-apexcharts";
import { getChartData } from "../../util/usefull_functions";
const DashboardAdministrateur = ({ data }) => {
  var [nbEvenementcategories, nbEvenementdataSeries] = getChartData(
    data.nb_evenement
  );
  var [budgetCategories, budgetDataSeries] = getChartData(data.budget);
  var nbEvenementoptions = {
    xaxis: {
      categories: nbEvenementcategories,
    },
    title: {
      text: "Nombre d'évenement par club",
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
      text: "Budget par club",
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
      <DashboardCard title="Demandes" cardData={data.demandes} />
      <DashboardCard title="Intervenant" cardData={data.intervenants} />
      <DashboardCard title="Sponsoring" cardData={data.sponsorings} />
      <DashboardCard title="Bilan " cardData={data.bilans} />
      <Chart
        options={nbEvenementoptions}
        series={nbEvenemtSeries}
        type="bar"
        width="500"
      />
      <Chart
        options={budgetOptions}
        series={budgetSeries}
        type="bar"
        width="500"
      />
    </DashboardAdministrateurContainer>
  );
};

export default DashboardAdministrateur;
