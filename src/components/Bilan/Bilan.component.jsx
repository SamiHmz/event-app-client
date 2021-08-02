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

const Bilan = () => {
  const [BilanCount, setBilanCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const bilanList = useSelector(bilanSelector);
  const bilanIsLoading = useSelector(bilanIsLoadingSelector);
  const [bilanId, setBilanId] = useState(null);
  const initiateurColumn = [
    ...Column,
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
        dispatch(startBilanFetching(1));
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, []);

  const handlePageChange = (page) => {
    dispatch(startBilanFetching(page));
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
          <SearchInput />
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
