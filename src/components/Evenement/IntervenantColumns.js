import React from "react";
import { File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { Avatar, Image } from "antd";

export const AdminstrateurColumn = [
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
    render: (photo) => (
      <Avatar src={<Image src={photo} />} shape="square" size="large" />
    ),
  },
  {
    title: "Nom",
    dataIndex: "nom",
    key: "nom",
  },
  {
    title: "Prénom",
    dataIndex: "prenom",
    key: "prenom",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Sexe",
    dataIndex: "sexe",
    key: "sexe",
  },
  {
    title: "Telephone",
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
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
  {
    title: "Cv ",
    dataIndex: "cv",
    key: "cv",
    render: (cv) => {
      return <File to={cv} title="Voir le cv de l'intervenant " />;
    },
  },
];
