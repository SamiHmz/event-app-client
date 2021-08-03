import React, { useEffect, useState } from "react";

import { Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import EvenementForm from "../EvenementForm/EvenementForm.componenet";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";
import { searchValueSelector } from "../../redux/search/search.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { toast } from "react-toastify";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import RenderTable from "../RenderTable/RenderTable.component";
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
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "./DemandeEvenement.styles";

import Search from "../../components/Search/Search.component";

import { AdminstrateurColumn } from "./demandesColums";
import SearchInput from "../SearchInput/SearchInput.component";
import Actions from "../Actions/Actions.component";
import { getColumn } from "../../util/usefull_functions";

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
        <Actions
          onDelete={startDeleteDemande}
          onEdit={handleEdit}
          title="demande"
          id={key}
        />
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
  const searchValue = useSelector(searchValueSelector);
  const searchOptions =
    user.type === typeUtilisateur.ADMINISTRATEUR
      ? ["intitulé", "initiateur", "lieu"]
      : ["intitulé", "lieu"];

  const getDemandesOnFirstLoad = async () => {
    try {
      const { data } = await getDemandesCount();
      setDemandeCount(data.count);
      dispatch(startFetchingDemandes(1, searchValue));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDemandesOnFirstLoad();
  }, [searchValue]);

  const handlePageChange = (page) => {
    dispatch(startFetchingDemandes(page, searchValue));
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
          <Search
            defaultSearchField={searchOptions[0]}
            options={searchOptions}
          />
        </ContainerTopLeft>
        <RenderFormAndButton
          visible={visible}
          setVisible={setVisible}
          type={typeUtilisateur.INITIATEUR}
          content="une demande"
        >
          <EvenementForm
            visible={visible}
            id={demandeId}
            setId={setDemandeId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </RenderFormAndButton>
      </ContainerTop>
      <ContainerBottom>
        <RenderTable
          isLoading={isLoading}
          pageSize={10}
          count={demandeCount}
          handlePageChange={handlePageChange}
          data={data}
          columns={getColumn(user, AdminstrateurColumn, initiateurColumn)}
        />
      </ContainerBottom>
    </Container>
  );
}

export default DemandeEvenement;
