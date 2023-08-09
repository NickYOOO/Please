import { styled } from 'styled-components';

export const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 15px;
  background: #ffefab;
  z-index: 999;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > h1 {
    font-size: 25px;
    color: #0074dd;

    padding-top: 5px;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  & > img {
    width: 30px;
    margin-right: 12px;
    cursor: pointer;
  }
`;

export const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ff6f2c; */
  /* background-color: #ffce00; */
  background-color: #0074dd;
  /* border: 2px solid #0074dd; */
  border-radius: 15px;
  width: 200px;
  height: 25px;

  & > a {
    line-height: 25px;
    color: #fff;
    /* color: black; */
    /* color: #0074dd; */
    outline: inherit;
    text-decoration: none;
    padding: 0 20px;
    background: none;
    border: none;

    font-size: 14px;

    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }

  & > a:first-child {
    border-right: 1px solid #eee;
  }
`;
