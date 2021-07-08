import React from "react";
import { Space } from "antd";
import { Delete, Edit, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";

export const initiateurColumn = [
  {
    title: "Intitulé de l'évenement",
    dataIndex: "intitulé",
    key: "intitulé",
  },
  {
    title: "Date de la demande",
    dataIndex: "date",
    key: "date",
  },

  {
    title: "Etat de la demande",
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
      return <Eye to={key} title="Voir les details de la demande " />;
    },
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "key",
    render: (key) => (
      <Space size="middle">
        <Delete title="Suprimer la demande " />
        <Edit title="Modifier la demande " />
      </Space>
    ),
  },
];

export const AdminstrateurColumn = [
  {
    title: "Initiateur de l'èvenement",
    dataIndex: "initiateur",
    key: "initiateur",
  },
  {
    title: "Intitulé de l'évenement",
    dataIndex: "intitulé",
    key: "intitulé",
  },
  {
    title: "Date de la demande",
    dataIndex: "date",
    key: "date",
  },

  {
    title: "Etat de la demande",
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
      return <Eye to={key} title="Voir les details de la demande " />;
    },
  },
];
