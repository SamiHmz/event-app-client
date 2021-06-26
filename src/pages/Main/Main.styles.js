import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const MainContainerRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow-y: hidden;
`;

export const MainContainerRightBottom = styled.div`
  max-height: 90%;
  overflow-y: scroll;
`;
