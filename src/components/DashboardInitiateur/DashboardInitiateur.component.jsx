import React, { useEffect } from "react";
import DashboardCard from "../DashboardCard/DashboardCard.component";
import { DashboardAdministrateurContainer } from "../DashboardAdministrateur/DashboardAdministrateur.styles";

const DashboardInitiateur = ({ data }) => {
  return (
    <DashboardAdministrateurContainer>
      <DashboardCard title="Demandes " cardData={data.nb_demande} />
      <DashboardCard
        title="Intervenant Externe"
        cardData={data.nb_intervenant.externe}
      />
      <DashboardCard
        title="Intervenant Interne"
        cardData={data.nb_intervenant.interne}
      />
      <DashboardCard
        title="Journalist"
        cardData={data.nb_intervenant.journalist}
      />
    </DashboardAdministrateurContainer>
  );
};

export default DashboardInitiateur;
