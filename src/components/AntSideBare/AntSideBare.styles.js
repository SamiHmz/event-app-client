import styled from "styled-components";

export const AntSideBareContainer = styled.div`
  width: ${({ windowWidth }) => (windowWidth > 750 ? "20%" : "100%")};
  height: 100%;
`;
