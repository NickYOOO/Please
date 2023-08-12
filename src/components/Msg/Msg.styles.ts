import { Button } from 'antd';
import { styled } from 'styled-components';

export const MsgParagraph = styled.p`
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 0;
  width: 100%;

  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 25px;
  padding: 25px 25px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MsgButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const MsgButton = styled(Button)`
  margin: 0 auto;
  background-color: #f9f7f1;
  color: #000000;

  &.active {
    color: #ffffff !important;
    background-color: #0074dd;
    border-color: #0074dd;

    &:hover {
      color: #ffffff !important;
      border-color: #f9f7f1 !important;
    }
  }

  &:hover {
    color: #000000 !important;
    border-color: #0074dd !important;
  }
`;

export const MsgBox = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: #f9f7f1;

  & > div > h1 {
    font-size: 15px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const MsgOption = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.4s;

  & > svg {
    &:hover {
      color: #3382d9 !important;
    }
  }
`;

export const MsgContent = styled.p`
  width: 410px;
  line-height: 1.5;
  margin-bottom: 15px;
  font-family: 'HakgyoansimWoojuR';
  font-size: 17px;
  font-weight: 900;
`;

export const MsgTimeBox = styled.p`
  float: right;
  font-size: 12px;
`;
