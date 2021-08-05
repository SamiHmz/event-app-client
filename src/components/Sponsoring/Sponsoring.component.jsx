import React, { useEffect, useState } from "react";
import { typeUtilisateur } from "../../util/magic_strings";
import { toast } from "react-toastify";
import RenderFormAndButton from "../RenderFormAndButton/RenderFormAndButton.component";
import RenderTable from "../RenderTable/RenderTable.component";
import { File, Eye } from "../Icons/icons";
import Etat from "../Etat/Etat.component";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
import Filter from "../Filter/Filter.component";
import Search from "../../components/Search/Search.component";
import { useSelector, useDispatch } from "react-redux";
import {
  startSponsoringFetching,
  startDeleteSponsoring,
} from "../../redux/sponsoring/sponsoring.actions";
import {
  sponsoringSelector,
  sponsoringIsLoadingSelector,
} from "../../redux/sponsoring/sponsoring.selectors";
import { userSelector } from "../../redux/user/user.selectors";
import {
  getAllSponsoringCount,
  getSponsoringIsOpened,
} from "../../services/sponsoring.services";
import SponsoringForm from "../SponsoringForm/SponsoringForm.component";
import Actions from "../Actions/Actions.component";
import { AdminstrateurColumn } from "./SponsoringColumns";
import { getColumn } from "../../util/usefull_functions";
import { sponsoringSearchOptions } from "../../util/search_options";
import { sponsoringFilterOptions } from "../../util/filter_options";
import useSearch from "../../hooks/useSearch";

const Sponsoring = () => {
  const [SponsoringCount, setSponsoringCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const searchOptions =
    user.type === typeUtilisateur.ADMINISTRATEUR
      ? [...sponsoringSearchOptions, typeUtilisateur.INITIATEUR]
      : sponsoringSearchOptions;
  const dispatch = useDispatch();
  const sponsoringList = useSelector(sponsoringSelector);
  const sponsoringIsLoading = useSelector(sponsoringIsLoadingSelector);
  const [sponsoringId, setSponsoringId] = useState(null);
  const { searchValue, filter } = useSearch();

  const initiateurColumn = [
    {
      title: "Evenement",
      dataIndex: "intitulé",
      key: "intitulé",
    },
    {
      title: "Sponsor",
      dataIndex: "sponsor",
      key: "sponsor",
    },

    {
      title: "Dossier sponsoring",
      dataIndex: "dossier",
      key: "dossier",
      render: (dossier) => {
        return <File to={dossier} title="Voir le dossier de  " />;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Montant",
      dataIndex: "montant",
      key: "montant",
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
          onDelete={startDeleteSponsoring}
          onEdit={handleEdit}
          title="sponsoring"
          id={key}
        />
      ),
    },
  ];

  useEffect(() => {
    const onLoad = async () => {
      try {
        const { data } = await getAllSponsoringCount(1);
        setSponsoringCount(data.count);
        dispatch(startSponsoringFetching(1, searchValue, filter));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, [searchValue, filter]);

  const handlePageChange = (page) => {
    dispatch(startSponsoringFetching(page, searchValue, filter));
  };
  const handleEdit = async (id) => {
    try {
      const { data: isOpened } = await getSponsoringIsOpened(id);

      if (isOpened)
        return toast.error(
          "vous ne pouvez pas modifier cette demande, un administrateur est en train de la validè ,Veuillez réessayer ultérieurement"
        );
      setSponsoringId(id);
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
          <Filter list={sponsoringFilterOptions} />{" "}
        </ContainerTopLeft>
        <RenderFormAndButton
          visible={visible}
          setVisible={setVisible}
          type={typeUtilisateur.INITIATEUR}
          content="sponsoring"
        >
          <SponsoringForm
            visible={visible}
            id={sponsoringId}
            setId={setSponsoringId}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </RenderFormAndButton>
      </ContainerTop>
      <ContainerBottom>
        <RenderTable
          isLoading={sponsoringIsLoading}
          pageSize={10}
          count={SponsoringCount}
          handlePageChange={handlePageChange}
          data={sponsoringList}
          columns={getColumn(user, AdminstrateurColumn, initiateurColumn)}
        />
      </ContainerBottom>
    </Container>
  );
};
export default Sponsoring;
