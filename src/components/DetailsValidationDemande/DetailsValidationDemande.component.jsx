import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import Etat from "../Etat/Etat.component";
import { useParams } from "react-router-dom";
import { startDemandeValidationFetching } from "../../redux/evenement/evenement.actions";
import {
  demandeValidationSelector,
  demandeValidationIsLoading,
} from "../../redux/evenement/evenement.selectors";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Etat",
    dataIndex: "etat",
    key: "etat",
    render: (etat) => (
      <>
        <Etat value={etat} />
      </>
    ),
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
];

const DetailsValidationDemande = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(demandeValidationIsLoading);
  const demandesValidation = useSelector(demandeValidationSelector);

  useEffect(() => {
    dispatch(startDemandeValidationFetching(id));
  }, []);
  return isLoading ? (
    <Spin size="large" />
  ) : (
    <Table
      columns={columns}
      style={{
        alignSelf: "center",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        maxWidth: "100%",
      }}
      tableLayout="fixed"
      dataSource={demandesValidation}
    />
  );
};

export default DetailsValidationDemande;
