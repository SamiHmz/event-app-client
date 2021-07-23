import React, { useEffect, useState } from "react";

import { Delete, Edit, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import EvenementForm from "../EvenementForm/EvenementForm.componenet";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner.component";
import {
  getDemandesCount,
  getDemandeIsOpened,
} from "../../services/evenement.services";
import {
  demandesSelector,
  demandesIsLoadingSelector,
} from "../../redux/evenement/evenement.selectors";
import {
  startFetchingDemandes,
  startDeleteDemande,
} from "../../redux/evenement/evenement.actions";
import { Button, Table, Spin, BackTop, Space, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "./DemandeEvenement.styles";

import { AdminstrateurColumn } from "./demandesColums";
import SearchInput from "../SearchInput/SearchInput.component";

function DemandeEvenement(props) {
  const initiateurColumn = [
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
          <Popconfirm
            title="Êtes-vous sûr de supprimer cette demande?"
            okText="Oui"
            cancelText="Non"
            onConfirm={() => dispatch(startDeleteDemande(key))}
          >
            <Delete title="Suprimer la demande " />
          </Popconfirm>
          <Edit title="Modifier la demande " onClick={() => handleEdit(key)} />
        </Space>
      ),
    },
  ];
  const [demandeCount, setDemandeCount] = useState(0);
  /********************* Form *********/

  const [visible, setVisible] = useState(false);
  const [demandeId, setDemandeId] = useState(null);

  /********************* Form *********/
  const dispatch = useDispatch();
  const data = useSelector(demandesSelector);
  const isLoading = useSelector(demandesIsLoadingSelector);
  const user = useSelector(userSelector);

  const getDemandesOnFirstLoad = async () => {
    try {
      const { data } = await getDemandesCount();
      setDemandeCount(data.count);
      dispatch(startFetchingDemandes());
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

  const getColumn = () => {
    return user.type === typeUtilisateur.ADMINISTRATEUR
      ? AdminstrateurColumn
      : initiateurColumn;
  };
  const handleEdit = async (id) => {
    try {
      const { data: isOpened } = await getDemandeIsOpened(id);

      if (isOpened)
        return toast.error(
          "vous ne pouvez pas modifier cette demande, un administrateur est en train de la validè ,Veuillez réessayer ultérieurement"
        );
      setDemandeId(id);
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ContainerTop>
        <ContainerTopLeft>
          <SearchInput />
        </ContainerTopLeft>
        {user.type === typeUtilisateur.ADMINISTRATEUR ? null : (
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
        )}
        {visible ? (
          <EvenementForm
            visible={visible}
            id={demandeId}
            setId={setDemandeId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        ) : null}
      </ContainerTop>
      <ContainerBottom>
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <Table
            columns={getColumn()}
            dataSource={data}
            scroll={{ scrollToFirstRowOnChange: true }}
            style={{
              alignSelf: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              width: "80%",
              overflowX: "scroll",
            }}
            pagination={{
              pageSize: 10,
              total: demandeCount,
              onChange: handlePageChange,
            }}
          />
        )}
      </ContainerBottom>
    </Container>
  );
}

export default DemandeEvenement;
