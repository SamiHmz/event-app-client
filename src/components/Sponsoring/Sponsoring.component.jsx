import React, { useEffect, useState } from "react";
import { typeUtilisateur } from "../../util/magic_strings";
import { toast } from "react-toastify";
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

const Sponsoring = () => {
  const [SponsoringCount, setSponsoringCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const sponsoringList = useSelector(sponsoringSelector);
  const sponsoringIsLoading = useSelector(sponsoringIsLoadingSelector);
  const [sponsoringId, setSponsoringId] = useState(null);
  const initiateurColumn = [
    ...AdminstrateurColumn,
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
        const { data } = await getAllSponsoringCount();
        setSponsoringCount(data.count);
        dispatch(startSponsoringFetching(1));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, []);

  const handlePageChange = (page) => {
    dispatch(startSponsoringFetching(page));
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
          <SearchInput />
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
