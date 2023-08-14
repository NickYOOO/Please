import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import check from '../../assets/img/check.svg';
import Logo from '../../assets/img/logo.svg';
import useLogInUser from '../../hooks/useLoginUser';
import Modal from '../common/modal/Modal';
import Msg from '../Msg/Msg';
import * as Styled from './Header.styles';

interface User {
  id: string;
  userName: string;
  img: string;
}

const Header: React.FC = () => {
  const paths = ['/signup', '/login', '/', '/post', '/board', '/report', '/update'];
  const dynamicPaths = /^\/detail|user|update\/[\w\d]+$/;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useLogInUser();

  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    if (storedResponse) {
      const parsedResponse = JSON.parse(storedResponse);
      const username = parsedResponse.user.username;
      setUser({ userName: username, id: parsedResponse.user.id, img: parsedResponse.user.imgUrl });
      setIsLoggedIn(true);
    } else {
      checkAndRedirectToLogin();
    }
  }, [pathname, userData]);

  const checkAndRedirectToLogin = () => {
    const protectedPaths = ['/post', '/detail/', '/user/', '/report'];
    const currentPath = window.location.pathname;
    if (protectedPaths.some(path => currentPath.startsWith(path))) {
      navigate('/login');
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

  const moveToUser = () => {
    window.location.href = `/user/${user?.id}`;
  };

  const openMessageModal = () => {
    setIsMessageModalOpen(true);
    setIsDropdownOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setTimeout(() => {
      setIsLogoutModalOpen(false);
      window.location.reload();
    }, 1500);
  };

  const LogoutHandler = () => {
    try {
      localStorage.removeItem('response');
      removeCookie('accessToken');
      openLogoutModal();
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
        <>
          <Styled.LoginUserBox onClick={toggleDropdown}>
            <img src={user?.img} alt="Profile" />
            <div>
              {user?.userName}님
              <Styled.DropdownMenu style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                <li onClick={moveToUser}>
                  <span>마이페이지</span>
                </li>
                <li onClick={openMessageModal}>
                  <span>쪽지함</span>
                </li>
                <li onClick={LogoutHandler}>
                  <span>로그아웃</span>
                </li>
              </Styled.DropdownMenu>
            </div>
          </Styled.LoginUserBox>
          <Modal isModalOpen={isMessageModalOpen} setIsModalOpen={setIsMessageModalOpen} closeButton={true} size="medium">
            <Msg />
          </Modal>
          <Modal isModalOpen={isLogoutModalOpen} setIsModalOpen={setIsLogoutModalOpen} closeButton={false} size="small">
            <img src={check} alt="알림창" style={{ width: '40px' }} />
            <div>
              <p>로그아웃 되었습니다.</p>
              <p>메시지창은 자동으로 사라집니다.</p>
            </div>
          </Modal>
        </>
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
