import React from 'react';
import * as Styled from './Layout.styles'
import ScrollTopBtn from './ScrollTopBtn';

interface LayoutProps{
  children: React.ReactNode
}
const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Styled.Container>{children}</Styled.Container>
      <ScrollTopBtn/>
    </>
  );
};

export default Layout;
