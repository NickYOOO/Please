import { styled } from 'styled-components';

export const FooterLayout = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 213;
  padding-top: 50px;
  background: #f8f0e5;

  & > p {
    line-height: 2;
    color: #ff6f2c;
    font-size: 16px;
  }
`;

export const FooterBox = styled.div`
  display: inline-flex;
  margin-top: 20px;
  gap: 20px;

  & > a {
    position: relative;
    cursor: pointer;
  }
`;
