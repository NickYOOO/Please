import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';
import * as Styled from './Header.styles';

const Header = () => {
  const paths = ['/signup', '/login', '/', '/post', '/board', '/report'];
  const dynamicPaths = /^\/detail|user\/[\w\d]+$/;

  if (!paths.includes(window.location.pathname) && !dynamicPaths.test(window.location.pathname)) {
    return null;
  }

  const moveToMain = () => {
    window.location.href = '/';
  };

  return (
    <Styled.Header>
      <Styled.TitleBox onClick={moveToMain}>
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
