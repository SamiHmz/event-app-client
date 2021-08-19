import styled from "styled-components";

export const Dot = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  margin-right: 5px;
`;

export const EtatCointainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DashboardCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 450px;
  border-radius: 0.375rem;
  padding: 10px;
  color: rgb(94, 110, 130);
  font-size: 1rem;
  box-shadow: rgba(65, 69, 88, 0.1) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.07) 0px 3px 6px 0px;
`;

export const CardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: rgb(52, 64, 80);
`;
