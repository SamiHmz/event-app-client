import React from "react";
import { File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { Avatar, Image } from "antd";

export const Column = [
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
    title: "Type",
    dataIndex: "type",
    key: "type",
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
];
