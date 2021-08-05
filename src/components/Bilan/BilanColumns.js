import React from "react";
import { File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { Avatar, Image } from "antd";

export const Column = [
  {
    title: "Evenement",
    dataIndex: "intitulé",
    key: "intitulé",
  },
  {
    title: "Initiateur",
    dataIndex: "initiateur",
    key: "initiateur",
  },
  {
    title: "Participant Interne",
    dataIndex: "participants_intern",
    key: "participants_intern",
  },
  {
    title: "Participant Externe",
    dataIndex: "participants_extern",
    key: "participants_extern",
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
