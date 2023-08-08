import React from 'react';

const Footer = () => {
  if (!['/signup', '/login', '/', '/post', '/board', '/detail/:id', '/user/:id', '/report'].includes(window.location.pathname)) return null;

  return <div>Footer</div>;
};

export default Footer;
