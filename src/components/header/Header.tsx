import React from 'react';

const Header = () => {
  if (
    window.location.pathname !== '/signup' &&
    window.location.pathname !== '/login' &&
    window.location.pathname !== '/' &&
    window.location.pathname !== '/post' &&
    window.location.pathname !== '/board' &&
    window.location.pathname !== '/detail/:id' &&
    window.location.pathname !== '/user/:id' &&
    window.location.pathname !== '/report'
  ) {
    return null;
  }

  return <div>Header</div>;
};

export default Header;
