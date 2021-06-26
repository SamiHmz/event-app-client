import React, { useEffect, useState } from "react";
import { Delete, Edit, Eye } from "../Icons/icons";
import { useSelector, useDispatch } from "react-redux";
import { getDemandesCount } from "../../services/evenement.services";
import {
  demandesSelector,
  demandeIsLoading,
} from "../../redux/evenement/evenement.selectors";
import { startFetchingDemandes } from "../../redux/evenement/evenement.actions";
import { Input, Space, Button, Table, Tag, Spin } from "antd";
import { ReactComponenet as Plus } from "../../img/plus-solid.svg";
import { PlusOutlined } from "@ant-design/icons";
import {
  EvenementsContainer,
  EvenementsContainerTop,
  EvenementsContainerBottom,
  EvenementsContainerTopLeft,
} from "./Evenements.styles";

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
    title: "Datails ",
    dataIndex: "details",
    key: "datails",
    render: (text, record) => (
      <Space size="middle">
        <Eye title="Voir les details de la demande " />
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Delete title="Suprimer la demande " />
        <Edit title="Modifier la demande " />
      </Space>
    ),
  },
];

const { Search } = Input;

function Evenements(props) {
  const [demandeCount, setDemandeCount] = useState(0);
  const dispatch = useDispatch();
  const data = useSelector(demandesSelector);
  const isLoading = useSelector(demandeIsLoading);

  const getDemandesOnFirstLoad = async () => {
    try {
      const { data } = await getDemandesCount();
      setDemandeCount(data.count);
      if (data.count > 0) {
        dispatch(startFetchingDemandes());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDemandesOnFirstLoad();
  }, []);

  const handlePageChange = (page) => {
    dispatch(startFetchingDemandes(page));
  };

  return demandeCount === 0 ? (
    <h1> Vous n'avez acune demande pour le moment </h1>
  ) : (
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
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            style={{
              alignSelf: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              width: "80%",
            }}
            pagination={{
              pageSize: 10,
              total: demandeCount,
              onChange: handlePageChange,
            }}
          />
        )}
      </EvenementsContainerBottom>
    </EvenementsContainer>
  );
}

export default Evenements;
