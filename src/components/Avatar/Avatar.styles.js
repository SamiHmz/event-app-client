import styled from "styled-components";

export const AvatarContainer = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media screen and (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;
