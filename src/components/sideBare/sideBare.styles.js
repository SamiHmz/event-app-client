import styled from "styled-components";
import { ReactComponent as Logo } from "../../img/logo.svg";

export const SideBareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: #0c212e;
  padding-top: 2%;
`;

export const SideBareLogo = styled.img`
  width: 60%;
  height: 7%;
  object-fit: contain;
  margin: 20px auto 60px auto;
`;

// export const SideBareLogo = styled(Logo)`
//   width: 60%;
//   height: 7%;
//   object-fit: contain;
// `;
