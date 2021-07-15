import styled from "styled-components";

export const NotificationItemContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const NotificationItemTextContainer = styled.div`
  margin-left: 15px;
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const TimeText = styled.div`
  font-size: 12px;
  color: #8c8c8c;
`;
