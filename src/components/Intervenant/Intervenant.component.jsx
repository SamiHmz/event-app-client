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
import Actions from "../Actions/Actions.component";
import { AdminstrateurColumn } from "./IntervenantColumns";
import { getColumn } from "../../util/usefull_functions";

const Intervenant = () => {
  const [IntervenantCount, setIntervenantCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const intervenantList = useSelector(intervenantSelector);
  const intervenantIsLoading = useSelector(intervenantIsLoadingSelector);
  const [intervenantId, setIntervenantId] = useState(null);
  const initiateurColumn = [
    ...AdminstrateurColumn,
    {
      title: "Action",
      key: "action",
      dataIndex: "key",
      render: (key) => (
        <Actions
          onDelete={startDeleteIntervenant}
          onEdit={handleEdit}
          title="intervenant"
          id={key}
        />
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
        <RenderTable
          isLoading={intervenantIsLoading}
          pageSize={10}
          count={IntervenantCount}
          handlePageChange={handlePageChange}
          data={intervenantList}
          columns={getColumn(user, AdminstrateurColumn, initiateurColumn)}
        />
      </ContainerBottom>
    </Container>
  );
};
export default Intervenant;
