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
  /* justify-items: center; */
  /* height: fit-content; */

  position: relative; // 추가한 코드

  width: 500px;
  height: 60%;
  margin: 170px 16px 0 16px;
  /* padding: 25px; */
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 5px 5px 12px rgba(23, 23, 23, 0.3);
`;

export const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;

  position: absolute;
  z-index: 1; // 추가한 코드
  top: 20px; // 추가한 코드
  left: -15px; // 추가한 코드

  width: 100%; // 추가한 코드

  & > button {
    background: none;
    border: none;
  }
`;
