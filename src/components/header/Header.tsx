import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import check from '../../assets/img/check.svg';
import Logo from '../../assets/img/logo.svg';
import Modal from '../common/modal/Modal';
import * as Styled from './Header.styles';

interface User {
  userName: string;
}

const Header = () => {
  const paths = ['/signup', '/login', '/', '/post', '/board', '/report', '/update'];
  const dynamicPaths = /^\/detail|user\/[\w\d]+$/;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 쪽지함 모달
  const { pathname } = useLocation();

  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    if (storedResponse) {
      const parsedResponse = JSON.parse(storedResponse);
      const username = parsedResponse.user.username;
      setUser({ userName: username });
      setIsLoggedIn(true);
    }
  }, [pathname]);

  if (!paths.includes(window.location.pathname) && !dynamicPaths.test(window.location.pathname)) {
    return null;
  }

  const moveToMain = () => {
    window.location.href = '/';
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      window.location.reload();
    }, 1500);
  };

  const handleLogout = () => {
    try {
      setIsModalOpen(true);
      localStorage.removeItem('response');
      removeCookie('accessToken');
      openModal();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };
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
            <Link to={`#`} onClick={handleLogout}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to={`/login`}>로그인</Link>
            <Link to={`/signup`}>회원가입</Link>
          </>
        )}
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeButton={false} size="small">
          <img src={check} alt="알림창" style={{ width: '40px' }} />
          <div>
            <p>로그아웃 되었습니다.</p>
            <p>메시지창은 자동으로 사라집니다.</p>
          </div>
        </Modal>
      </Styled.UserBox>
    </Styled.Header>
  );
};
export default Header;
