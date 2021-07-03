import React, { useEffect, useState } from "react";
import EvenementForm from "../EvenementForm/EvenementForm.componenet";
import Etat from "../Etat/Etat.component";
import { Delete, Edit, Eye } from "../Icons/icons";
import { useSelector, useDispatch } from "react-redux";

import { getDemandesCount } from "../../services/evenement.services";
import {
  demandesSelector,
  demandesIsLoadingSelector,
} from "../../redux/evenement/evenement.selectors";
import { startFetchingDemandes } from "../../redux/evenement/evenement.actions";
import { Input, Space, Button, Table, Tag, Spin, BackTop } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  DemandeEvenementContainer,
  DemandeEvenementContainerTop,
  DemandeEvenementContainerBottom,
  DemandeEvenementContainerTopLeft,
} from "./DemandeEvenement.styles";

const columns = [
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

const { Search } = Input;

function DemandeEvenement(props) {
  const [demandeCount, setDemandeCount] = useState(0);
  /********************* Form *********/

  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    setVisible(false);
  };

  /********************* Form *********/
  const dispatch = useDispatch();
  const data = useSelector(demandesSelector);
  const isLoading = useSelector(demandesIsLoadingSelector);

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
    console.log("excuted");
    dispatch(startFetchingDemandes(page));
  };

  return (
    <DemandeEvenementContainer>
      <DemandeEvenementContainerTop>
        <DemandeEvenementContainerTopLeft>
          {/* <Title>Demandes</Title> */}
          <Search
            size="large"
            style={{ width: "50%" }}
            placeholder="input search text"
            enterButton
          />
        </DemandeEvenementContainerTopLeft>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {
            setVisible(true);
          }}
        >
          Nouvel Evenement
        </Button>
        <EvenementForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </DemandeEvenementContainerTop>
      <DemandeEvenementContainerBottom>
        {isLoading ? (
          demandeCount > 0 ? (
            <Spin size="large" />
          ) : (
            <h1>there is no data</h1>
          )
        ) : (
          <Table
            columns={columns}
            tableLayout="fixed"
            dataSource={data}
            scroll={{ scrollToFirstRowOnChange: true }}
            style={{
              alignSelf: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              maxWidth: "80%",
            }}
            pagination={{
              pageSize: 10,
              total: demandeCount,
              onChange: handlePageChange,
            }}
          />
        )}
        <BackTop />
      </DemandeEvenementContainerBottom>
    </DemandeEvenementContainer>
  );
}

export default DemandeEvenement;
