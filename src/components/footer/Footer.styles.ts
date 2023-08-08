import { styled } from 'styled-components';

export const FooterLayout = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 213; */
  padding-top: 20px;
  background: #ffefab;

  & > p {
    line-height: 2;
    /* color: #ff6f2c; */
    /* color: #ff004c; */
    color: #444444;
    /* color: #0074dd; */
    font-size: 13px;
  }
`;

export const FooterBox = styled.div`
  display: inline-flex;
  margin: 10px 0;
  gap: 20px;

  & > a {
    position: relative;
    cursor: pointer;
  }
`;
