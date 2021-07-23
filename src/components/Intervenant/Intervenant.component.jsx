import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Delete, Edit, File } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { typeUtilisateur } from "../../util/magic_strings";
import { Button, Table, Spin, Space, Popconfirm, Avatar, Image } from "antd";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
import SearchInput from "../SearchInput/SearchInput.component";
import { useSelector, useDispatch } from "react-redux";
import {
  startIntervenantFetching,
  startDeleteIntervenant,
} from "../../redux/intervenant/intervenant.actions";
import {
  intervenantSelector,
  intervenantIsLoadingSelector,
} from "../../redux/intervenant/intervenant.selectors";
import { userSelector } from "../../redux/user/user.selectors";
import { getAllIntervenantCount } from "../../services/intervenant.services";
import IntervenantForm from "../IntervenantForm/IntervenantForm.component";
const Intervenant = () => {
  const [IntervenantCount, setIntervenantCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const intervenantList = useSelector(intervenantSelector);
  const intervenantIsLoading = useSelector(intervenantIsLoadingSelector);
  const [intervenantId, setIntervenantId] = useState(null);
  const columns = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
      title: "Cv ",
      dataIndex: "cv",
      key: "cv",
      render: (cv) => {
        return <File to={cv} title="Voir le cv de l'intervenant " />;
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
            onConfirm={() => dispatch(startDeleteIntervenant(key))}
          >
            <Delete title="Suprimer la demande " />
          </Popconfirm>
          <Edit title="Modifier la demande " onClick={() => handleEdit(key)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const onLoad = async () => {
      try {
        const { data } = await getAllIntervenantCount();
        setIntervenantCount(data.count);
        dispatch(startIntervenantFetching(1));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, []);

  const handlePageChange = (page) => {
    dispatch(startIntervenantFetching(page));
  };
  const handleEdit = (id) => {
    setIntervenantId(id);
    setVisible(true);
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
            Ajouter itervenant
          </Button>
        )}
        {visible ? (
          <IntervenantForm
            visible={visible}
            id={intervenantId}
            setId={setIntervenantId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        ) : null}
      </ContainerTop>
      <ContainerBottom>
        {intervenantIsLoading ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={intervenantList}
            scroll={{ scrollToFirstRowOnChange: true }}
            style={{
              alignSelf: "center",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              width: "90%",
              overflowX: "scroll",
            }}
            pagination={{
              pageSize: 10,
              total: IntervenantCount,
              onChange: handlePageChange,
            }}
          />
        )}
      </ContainerBottom>
    </Container>
  );
};
export default Intervenant;