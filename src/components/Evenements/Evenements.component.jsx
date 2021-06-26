import React from "react";
import { Input, Space, Button, Table, Tag } from "antd";
import { ReactComponenet as Plus } from "../../img/plus-solid.svg";
import { PlusOutlined } from "@ant-design/icons";
import {
  EvenementsContainer,
  EvenementsContainerTop,
  EvenementsContainerBottom,
  EvenementsContainerTopLeft,
  Title,
} from "./Evenements.styles";
const data = [
  {
    key: "1",
    nom: "John Brown",
    date: 32,
    address: "New York No. 1 Lake Park",
    etat: "approuvè",
  },
  {
    key: "2",
    nom: "John Brown",
    date: 32,
    address: "New York No. 1 Lake Park",
    etat: "approuvè",
  },
  {
    key: "3",
    nom: "John Brown",
    date: 32,
    address: "New York No. 1 Lake Park",
    etat: "approuvè",
  },
];

const columns = [
  {
    title: "Nom de l'évenement",
    dataIndex: "nom",
    key: "nom",
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
        <Tag key={etat}>{etat.toUpperCase()}</Tag>
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>modifier </a>
        <a>supprimer</a>
      </Space>
    ),
  },
];

const { Search } = Input;

function Evenements(props) {
  return (
    <EvenementsContainer>
      <EvenementsContainerTop>
        <EvenementsContainerTopLeft>
          {/* <Title>Demandes</Title> */}
          <Search
            size="large"
            style={{ width: "50%" }}
            placeholder="input search text"
            enterButton
          />
        </EvenementsContainerTopLeft>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Nouvel Evenement
        </Button>
      </EvenementsContainerTop>
      <EvenementsContainerBottom>
        <Table
          columns={columns}
          dataSource={data}
          style={{
            alignSelf: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          pagination={{
            pageSize: 12,
            onChange: (page, pageSize) => {
              console.log(page);
            },
            total: 50,
          }}
        />
      </EvenementsContainerBottom>
    </EvenementsContainer>
  );
}

export default Evenements;
