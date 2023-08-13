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
  height: 50px;
  padding: 15px;
  background: #f9f7f1;
  z-index: 999;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > h1 {
    font-size: 25px;
    color: #3382d9;

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

export const LogoutUserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #3382d9;

  border-radius: 15px;
  width: 200px;
  height: 25px;

  & > a {
    line-height: 25px;
    color: #fff;

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

export const LoginUserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 14px;
  cursor: pointer;

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 7px;
  }
`;

export const DropdownMenu = styled.ul`
  text-align: center;
  position: absolute;
  top: 100%;
  left: 15%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 8px 0;
  min-width: 100px;
  list-style: none;

  & > li {
    line-height: 25px;
    color: #0074dd;
    outline: inherit;
    text-decoration: none;
    padding: 8px;
    background: none;
    border: none;

    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    & > a {
      color: #0074dd;
      text-decoration: none;
    }
  }
`;
