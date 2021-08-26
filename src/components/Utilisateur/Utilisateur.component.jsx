import React, { useEffect, useState } from "react";
import { typeUtilisateur } from "../../util/magic_strings";
import Filter from "../Filter/Filter.component";
import Search from "../../components/Search/Search.component";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import RenderTable from "../RenderTable/RenderTable.component";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
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
import useSearch from "../../hooks/useSearch";
import { usersFilterOptions } from "../../util/filter_options";
import { uesersSearchOptions } from "../../util/search_options";
import { isFilterInitialisedSelector } from "../../redux/search/search.selectors";

const Utilisateur = () => {
  const [UtilisateurCount, setUtilisateurCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const utilisateurList = useSelector(utilisateurSelector);
  const utilisateurIsLoading = useSelector(utilisateurIsLoadingSelector);
  const [utilisateurId, setUtilisateurId] = useState(null);
  const { searchValue, filter } = useSearch();

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
        dispatch(startUtilisateurFetching(1, searchValue, filter));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, [searchValue, filter]);

  const handlePageChange = (page) => {
    dispatch(startUtilisateurFetching(page, searchValue, filter));
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
          <Search
            defaultSearchField={uesersSearchOptions[0]}
            options={uesersSearchOptions}
          />
          <Filter list={usersFilterOptions} />
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
