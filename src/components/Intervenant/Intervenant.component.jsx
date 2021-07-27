import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Delete, Edit, File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { typeUtilisateur } from "../../util/magic_strings";
import { toast } from "react-toastify";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
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
import {
  getAllIntervenantCount,
  getIntervenantIsOpened,
} from "../../services/intervenant.services";
import IntervenantForm from "../IntervenantForm/IntervenantForm.component";
const AdminstrateurColumn = [
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
const Intervenant = () => {
  const [IntervenantCount, setIntervenantCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const intervenantList = useSelector(intervenantSelector);
  const intervenantIsLoading = useSelector(intervenantIsLoadingSelector);
  const [intervenantId, setIntervenantId] = useState(null);
  const initiateurColumn = [
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
  const getColumn = () => {
    return user.type === typeUtilisateur.ADMINISTRATEUR
      ? AdminstrateurColumn
      : initiateurColumn;
  };

  const handlePageChange = (page) => {
    dispatch(startIntervenantFetching(page));
  };
  const handleEdit = async (id) => {
    try {
      const { data: isOpened } = await getIntervenantIsOpened(id);

      if (isOpened)
        return toast.error(
          "vous ne pouvez pas modifier cette demande, un administrateur est en train de la validè ,Veuillez réessayer ultérieurement"
        );
      setIntervenantId(id);
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
        <RenderFormAndButton
          visible={visible}
          setVisible={setVisible}
          type={typeUtilisateur.INITIATEUR}
          content="intervenant"
        >
          <IntervenantForm
            visible={visible}
            id={intervenantId}
            setId={setIntervenantId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </RenderFormAndButton>
      </ContainerTop>
      <ContainerBottom>
        {intervenantIsLoading ? (
          <Spin />
        ) : (
          <Table
            columns={getColumn()}
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
