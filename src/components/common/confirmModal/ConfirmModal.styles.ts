import { Button } from 'antd';
import { styled } from 'styled-components';

export const ConfirmModalButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ConfirmButton = styled(Button)`
  border-color: #0074dd !important;
  &:hover {
    background-color: #0074dd;
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;

export const CancelButton = styled(Button)`
  border-color: #ff004c !important;
  &:hover {
    background-color: #ff004c;
    color: #ffffff !important;
    border-color: #ff004c !important;
  }
`;
