import React, { useEffect, useState } from "react";
import moment from "moment";
import { typeUtxilisateur } from "../../util/magic_strings";
import {
  Container,
  ContainerTop,
  ContainerTopLeft,
} from "../DemandeEvenement/DemandeEvenement.styles";
import Search from "../Search/Search.component";
import Filter from "../Filter/Filter.component";
import {
  searchValueSelector,
  filterSelector,
} from "../../redux/search/search.selectors";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/user/user.selectors";

import { intervenantSearchOptions } from "../../util/search_options";
import { intervenantFilterOptions } from "../../util/filter_options";

import { Card, Carousel, Descriptions, Image, Spin } from "antd";
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
  const user = useSelector(userSelector);
  const evenements = useSelector(evenementsSelector);
  const evenementsIsLoading = useSelector(evenementsIsLoadingSelector);
  const evenementPageNumber = useSelector(evenementPageNumberSelector);
  const searchValue = useSelector(searchValueSelector);
  const filter = useSelector(filterSelector);

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
      <EvenementContainer>
        {evenementsIsLoading ? (
          <Spin />
        ) : (
          <EvenementList evenements={evenements} />
        )}
      </EvenementContainer>
      <a
        style={{ textAlign: "center" }}
        onClick={() => dispatch(setEvenementsPageNumber())}
      >
        Load More ...
      </a>
    </Container>
  );
};
export default Evenement;
