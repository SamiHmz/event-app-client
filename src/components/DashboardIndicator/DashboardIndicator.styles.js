import styled from "styled-components";

export const IndicatorIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  align-items: center;
  width: 300px;
  box-shadow: rgba(65, 69, 88, 0.1) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.07) 0px 3px 6px 0px;
  margin-bottom: 50px;
`;

export const IndicatorTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const IndicatorValue = styled.div`
  text-align: center;
  font-weight: 600;
`;
