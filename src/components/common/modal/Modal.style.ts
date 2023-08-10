import { styled } from 'styled-components';

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #00000029;
  z-index: 999;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  height: fit-content;
  width: 800px;
  margin: 100px 16px 0 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 5px 5px 12px rgba(33, 33, 33, 0.7);
`;

export const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;

  & > button {
    background: none;
    border: none;
  }
`;
