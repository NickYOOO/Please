import React from 'react';
import { useLocation } from 'react-router-dom';
import * as Styled from './Layout.styles';
import ScrollTopBtn from './ScrollTopBtn';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  if ('/' === location.pathname) return <>{children}</>;

  return (
    <>
      <Styled.Container>{children}</Styled.Container>
      <ScrollTopBtn />
    </>
  );
};

export default Layout;
