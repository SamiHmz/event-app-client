import React, { useEffect, useState } from "react";
import { typeUtilisateur, etat } from "../../util/magic_strings";
import { Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import { Popconfirm } from "antd";
import { Valide } from "../Icons/icons";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import RenderTable from "../RenderTable/RenderTable.component";
import Filter from "../Filter/Filter.component";
import Search from "../../components/Search/Search.component";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
import { bilanSearchOptions } from "../../util/search_options";
import { bilanFilterOptions } from "../../util/filter_options";
import { useSelector, useDispatch } from "react-redux";
import {
  startBilanFetching,
  startDeleteBilan,
  startValidateBilan,
} from "../../redux/bilan/bilan.actions";
import {
  bilanSelector,
  bilanIsLoadingSelector,
} from "../../redux/bilan/bilan.selectors";
import { userSelector } from "../../redux/user/user.selectors";
import { getAllBilanCount } from "../../services/bilan.services";
import BilanForm from "../BilanForm/BilanForm.component";
import Actions from "../Actions/Actions.component";
import { Column } from "./BilanColumns";
import { getColumn } from "../../util/usefull_functions";
import useSearch from "../../hooks/useSearch";
import { resetFilter } from "../../redux/search/search.actions";

const Bilan = () => {
  const [BilanCount, setBilanCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const bilanList = useSelector(bilanSelector);
  const bilanIsLoading = useSelector(bilanIsLoadingSelector);
  const [bilanId, setBilanId] = useState(null);
  const { searchValue, filter } = useSearch();
  const searchOptions =
    user.type === typeUtilisateur.ADMINISTRATEUR
      ? [...bilanSearchOptions, typeUtilisateur.INITIATEUR]
      : bilanSearchOptions;

  const initiateurColumn = [
    {
      title: "Evenement",
      dataIndex: "intitulé",
      key: "intitulé",
    },
    {
      title: "Participant Interne",
      dataIndex: "participants_intern",
      key: "participants_intern",
    },
    {
      title: "Participant Externe",
      dataIndex: "participants_extern",
      key: "participants_extern",
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
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Actions
          onDelete={startDeleteBilan}
          onEdit={handleEdit}
          title="bilan"
          id={key}
        />
      ),
    },
  ];

  const AdminstrateurColumn = [
    ...Column,
    {
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Popconfirm
          title={`Voulez vous aprouvé ou rejeté  ce bilan?`}
          okText="Aprouvé"
          cancelText="Rejeté"
          onConfirm={() =>
            dispatch(startValidateBilan(key, { etat: etat.APROUVER }))
          }
          onCancel={() =>
            dispatch(startValidateBilan(key, { etat: etat.REJETER }))
          }
        >
          <Valide />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const onLoad = async () => {
      try {
        const { data } = await getAllBilanCount();
        setBilanCount(data.count);
        dispatch(startBilanFetching(1, searchValue, filter));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, [searchValue, filter]);

  const handlePageChange = (page) => {
    dispatch(startBilanFetching(page, searchValue, filter));
  };
  const handleEdit = async (id) => {
    try {
      setBilanId(id);
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
            defaultSearchField={searchOptions[0]}
            options={searchOptions}
          />
          <Filter list={bilanFilterOptions} />
        </ContainerTopLeft>
        <RenderFormAndButton
          visible={visible}
          setVisible={setVisible}
          type={typeUtilisateur.INITIATEUR}
          content="bilan"
        >
          <BilanForm
            visible={visible}
            id={bilanId}
            setId={setBilanId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </RenderFormAndButton>
      </ContainerTop>
      <ContainerBottom>
        <RenderTable
          isLoading={bilanIsLoading}
          pageSize={10}
          count={BilanCount}
          handlePageChange={handlePageChange}
          data={bilanList}
          columns={getColumn(user, AdminstrateurColumn, initiateurColumn)}
        />
      </ContainerBottom>
    </Container>
  );
};
export default Bilan;
