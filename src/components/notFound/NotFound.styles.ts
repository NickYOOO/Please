import { styled } from 'styled-components';

export const FullPageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -40px;
  padding: 10px;

  & > h1 {
    font-size: 60px;
    color: #000000;
    margin: 40px 0 40px 0;
    word-break: keep-all;
  }

  & > p {
    font-size: 34px;
    font-weight: 500;
    color: #000000;
    word-break: keep-all;
  }
`;
