import React from "react";
import { Space } from "antd";
import { Delete, Edit, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";

export const AdminstrateurColumn = [
  {
    title: "Initiateur de l'èvenement",
    dataIndex: "initiateur",
    key: "initiateur",
  },
  {
    title: "Lieu",
    dataIndex: "lieu",
    key: "lieu",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Mode",
    dataIndex: "mode",
    key: "mode",
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
