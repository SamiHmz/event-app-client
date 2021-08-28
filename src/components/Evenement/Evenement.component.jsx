import React, { useEffect } from "react";
import {
  Container,
  ContainerTop,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";

import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";

import { Empty, Spin } from "antd";
import {
  startFetchingEvenements,
  resetEvenements,
  setEvenementsPageNumber,
} from "../../redux/evenement/evenement.actions";
import {
  evenementsSelector,
  evenementsIsLoadingSelector,
  evenementPageNumberSelector,
} from "../../redux/evenement/evenement.selectors";
import EvenementList from "../EvenementList/EvenementList.component";
import { EvenementContainer } from "./Evenement.styles";

const Evenement = () => {
  const evenements = useSelector(evenementsSelector);
  const evenementsIsLoading = useSelector(evenementsIsLoadingSelector);
  const evenementPageNumber = useSelector(evenementPageNumberSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startFetchingEvenements(evenementPageNumber));
  }, [evenementPageNumber]);

  useEffect(() => {
    return () => {
      dispatch(resetEvenements());
    };
  }, []);

  return (
    <Container>
      <ContainerTop>
        <ContainerTopLeft>
          {/* <Search
            defaultSearchField={intervenantSearchOptions[0]}
            options={intervenantSearchOptions}
          />
          <Filter list={intervenantFilterOptions} /> */}
        </ContainerTopLeft>
      </ContainerTop>
      {evenementsIsLoading ? (
        <Spin />
      ) : evenements.length === 0 ? (
        <Empty />
      ) : (
        <>
          <EvenementContainer>
            <EvenementList evenements={evenements} />
          </EvenementContainer>
          <a
            style={{ textAlign: "center" }}
            onClick={() => dispatch(setEvenementsPageNumber())}
          >
            Load More ...
          </a>
        </>
      )}
    </Container>
  );
};
export default Evenement;
