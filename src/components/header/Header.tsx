import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';
import * as Styled from './Header.styles';
import { useCookies } from 'react-cookie';
import axios from 'axios';

interface User {
  userName: string;
}
const Header = () => {
  const paths = ['/signup', '/login', '/', '/post', '/board', '/report'];
  const dynamicPaths = /^\/detail|user\/[\w\d]+$/;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    if (storedResponse) {
      const parsedResponse = JSON.parse(storedResponse);
      const username = parsedResponse.user.username;
      setUser({ userName: username });
      setIsLoggedIn(true);
      console.log('2');
    }
    console.log(storedResponse);
  }, [pathname]);

  console.log('1');

  if (!paths.includes(window.location.pathname) && !dynamicPaths.test(window.location.pathname)) {
    console.log('-3');
    return null;
  }
  const moveToMain = () => {
    window.location.href = '/';
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('response');
      removeCookie('accessToken');
      setIsLoggedIn(false);
      alert('로그아웃 돼쓰 빠세!!');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };
  console.log('-1');
  return (
    <Styled.Header>
      <Styled.TitleBox onClick={moveToMain}>
        <img src={Logo} alt="logo" />
        <h1>부탁해</h1>
      </Styled.TitleBox>
      <Styled.UserBox>
        {isLoggedIn ? (
          <>
            <Link to={`/mypage`}>{user?.userName}님</Link>
            <Link to="#" onClick={handleLogout}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to={`/login`}>로그인</Link>
            <Link to={`/signup`}>회원가입</Link>
          </>
        )}
      </Styled.UserBox>
    </Styled.Header>
  );
};

export default Header;
