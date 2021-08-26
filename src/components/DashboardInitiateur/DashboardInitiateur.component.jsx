import React, { useEffect } from "react";
import Event from "../../img/event.svg";
import Conference from "../../img/conference.svg";
import Money from "../../img/money-bag.svg";
import DashboardCard from "../DashboardCard/DashboardCard.component";
import { DashboardAdministrateurContainer } from "../DashboardAdministrateur/DashboardAdministrateur.styles";
import DashboardIndicator from "../DashboardIndicator/DashboardIndicator.component";
const DashboardInitiateur = ({ data }) => {
  return (
    <DashboardAdministrateurContainer>
      <DashboardIndicator
        icon={Event}
        title="Nombre d'Evenement"
        value={data.nb_evenement}
      ></DashboardIndicator>
      <DashboardIndicator
        icon={Conference}
        title="Nombre d'Intervenant "
        value={data.intervenants.approuvé}
      ></DashboardIndicator>
      <DashboardIndicator
        icon={Money}
        title="Budget Consomé"
        value={data.total_sponsoring}
      ></DashboardIndicator>
      <DashboardCard title="Demandes " cardData={data.demandes} />
      <DashboardCard title="Intervenants" cardData={data.intervenants} />
      <DashboardCard title="Sponsorings" cardData={data.sponsorings} />
      <DashboardCard title="Bilans" cardData={data.bilans} />
    </DashboardAdministrateurContainer>
  );
};

export default DashboardInitiateur;
