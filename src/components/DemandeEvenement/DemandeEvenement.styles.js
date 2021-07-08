import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;

export const DemandeEvenementContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DemandeEvenementContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3% 5%;
  @media screen and (max-width: 700) {
    flex-direction: column;
  }
`;
export const DemandeEvenementContainerTopLeft = styled.div`
  display: flex;
  width: 70%;
  @media screen and (max-width: 700) {
    width: 100%;
  }
`;

export const Title = styled.div`
  font-size: 30px;
  color: #495057;
  font-weight: 600;
  margin-right: 30px;
`;

export const DemandeEvenementContainerBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SearchInput = styled(Search)`
  width: 50%;

  @media screen and (max-width: 700) {
    width: 100%;
  }
`;
