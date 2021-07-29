import React from "react";
import { File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";

export const AdminstrateurColumn = [
  {
    title: "Evenement",
    dataIndex: "intitulé",
    key: "intitulé",
  },
  {
    title: "Sponsor",
    dataIndex: "sponsor",
    key: "sponsor",
  },

  {
    title: "Dossier sponsoring",
    dataIndex: "dossier",
    key: "dossier",
    render: (dossier) => {
      return <File to={dossier} title="Voir le dossier de  " />;
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Montant",
    dataIndex: "montant",
    key: "montant",
  },

  {
    title: "Etat",
    key: "etat",
    dataIndex: "etat",
    render: (etat) => (
      <>
        <Etat value={etat} />
      </>
    ),
  },
  {
    title: "Datails ",
    dataIndex: "key",
    key: "details",
    render: (key) => {
      return <Eye to={key} title="Voir les details de l'intervenant " />;
    },
  },
];
