import React from 'react';
import * as Styled from './Header.styles';
import Logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
const Header = () => {
  if (!['/signup', '/login', '/', '/post', '/board', '/detail/:id', '/user/:id', '/report'].includes(window.location.pathname)) return null;

  return (
    <Styled.Header>
      <Styled.TitleBox>
        <img src={Logo} alt="logo" />
        <h1>부탁해</h1>
      </Styled.TitleBox>
      <Styled.UserBox>
        <>
          <Link to={`/login`}>로그인</Link>
          <Link to={`/signup`}>회원가입</Link>
        </>
      </Styled.UserBox>
    </Styled.Header>
  );
};

export default Header;
