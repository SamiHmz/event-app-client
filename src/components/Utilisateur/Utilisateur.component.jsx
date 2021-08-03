import React, { useEffect, useState } from "react";
import { typeUtilisateur, etat } from "../../util/magic_strings";
import { toast } from "react-toastify";
import { Popconfirm } from "antd";
import { Valide } from "../Icons/icons";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import RenderTable from "../RenderTable/RenderTable.component";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
import SearchInput from "../SearchInput/SearchInput.component";
import { useSelector, useDispatch } from "react-redux";
import {
  startUtilisateurFetching,
  startDeleteUtilisateur,
} from "../../redux/utilisateur/utilisateur.actions";
import {
  utilisateurSelector,
  utilisateurIsLoadingSelector,
} from "../../redux/utilisateur/utilisateur.selectors";
import { userSelector } from "../../redux/user/user.selectors";
import { getAllUtilisateurCount } from "../../services/utilisateur.services";
import UtilisateurForm from "../UtilisateurForm/UtilisateurForm.component";
import Actions from "../Actions/Actions.component";
import { Column } from "./UtilisateurColumns";
import { getColumn } from "../../util/usefull_functions";

const Utilisateur = () => {
  const [UtilisateurCount, setUtilisateurCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const utilisateurList = useSelector(utilisateurSelector);
  const utilisateurIsLoading = useSelector(utilisateurIsLoadingSelector);
  const [utilisateurId, setUtilisateurId] = useState(null);

  const AdminstrateurColumn = [
    ...Column,
    {
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Actions
          onDelete={startDeleteUtilisateur}
          onEdit={handleEdit}
          title="Utilisateur"
          id={key}
        />
      ),
    },
    ,
  ];

  useEffect(() => {
    const onLoad = async () => {
      try {
        const { data } = await getAllUtilisateurCount();
        setUtilisateurCount(data.count);
        dispatch(startUtilisateurFetching(1));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, []);

  const handlePageChange = (page) => {
    dispatch(startUtilisateurFetching(page));
  };
  const handleEdit = async (id) => {
    try {
      setUtilisateurId(id);
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
          type={typeUtilisateur.ADMINISTRATEUR}
          content="utilisateur"
        >
          <UtilisateurForm
            visible={visible}
            id={utilisateurId}
            setId={setUtilisateurId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </RenderFormAndButton>
      </ContainerTop>
      <ContainerBottom>
        <RenderTable
          isLoading={utilisateurIsLoading}
          pageSize={10}
          count={UtilisateurCount}
          handlePageChange={handlePageChange}
          data={utilisateurList}
          columns={AdminstrateurColumn}
        />
      </ContainerBottom>
    </Container>
  );
};
export default Utilisateur;
