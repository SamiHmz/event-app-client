import styled from "styled-components";

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 10%;
  width: 100%;
  padding: 0 9%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media screen and (max-width: 700px) {
    justify-content: space-between;
    font-size: 10px;
  }
`;

export const NavBarElements = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;

  @media screen and (max-width: 400px) {
    width: 90%;
  }
`;

export const NavBarElementsRight = styled.div`
  width: 38%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 400px) {
    width: 65%;
  }
`;
