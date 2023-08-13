import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Navigate, useLocation } from 'react-router-dom';
import check from '../../assets/img/check.svg';
import Logo from '../../assets/img/logo.svg';
import ProfileImg from '../../assets/img/profile.png';
import Modal from '../common/modal/Modal';
import Msg from '../Msg/Msg';
import * as Styled from './Header.styles';

interface User {
  userName: string;
}

const Header: React.FC = () => {
  const paths = ['/signup', '/login', '/', '/post', '/board', '/report', '/update'];
  const dynamicPaths = /^\/detail|user|update\/[\w\d]+$/;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // 쪽지함 모달
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    if (storedResponse) {
      const parsedResponse = JSON.parse(storedResponse);
      const username = parsedResponse.user.username;
      setUser({ userName: username });
      setIsLoggedIn(true);
    } else {
      checkAndRedirectToLogin();
    }
  }, [pathname]);

  const checkAndRedirectToLogin = () => {
    const storedResponse = localStorage.getItem('response');
    if (!storedResponse) {
      const protectedPaths = ['/post', '/detail/', '/user/', '/report'];
      const currentPath = window.location.pathname;

      if (protectedPaths.some(path => currentPath.startsWith(path))) {
        window.location.href = '/login';
      }
    }
  };

  if (!paths.includes(window.location.pathname) && !dynamicPaths.test(window.location.pathname)) {
    return null;
  }

  const moveToMain = () => {
    window.location.href = '/';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const LogoutHandler = () => {
    try {
      localStorage.removeItem('response');
      removeCookie('accessToken');
      setIsLogoutModalOpen(true);
      openMessageModal();
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
      {isLoggedIn ? (
        <Styled.LoginUserBox onClick={toggleDropdown}>
          <img src={ProfileImg} alt="Profile" />
          <div>
            {user?.userName}님
            <Styled.DropdownMenu style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              <li>
                <Link to={`/user/:id`}>마이페이지</Link>
              </li>
              <li>
                <span onClick={openMessageModal}>쪽지함</span>
                <Modal isModalOpen={isMessageModalOpen} setIsModalOpen={setIsMessageModalOpen} closeButton={true} size="medium">
                  <Msg />
                </Modal>
              </li>
              <li>
                <span onClick={LogoutHandler}>로그아웃</span>
              </li>
              <Modal isModalOpen={isLogoutModalOpen} setIsModalOpen={setIsLogoutModalOpen} closeButton={false} size="small">
                <img src={check} alt="알림창" style={{ width: '40px' }} />
                <div>
                  <p>로그아웃 되었습니다.</p>
                  <p>메시지창은 자동으로 사라집니다.</p>
                </div>
              </Modal>
            </Styled.DropdownMenu>
          </div>
        </Styled.LoginUserBox>
      ) : (
        <Styled.LogoutUserBox>
          <Link to={`/login`}>로그인</Link>
          <Link to={`/signup`}>회원가입</Link>
        </Styled.LogoutUserBox>
      )}
    </Styled.Header>
  );
};
export default Header;
