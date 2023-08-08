const Header = () => {
  if (!['/signup', '/login', '/', '/post', '/board', '/detail/:id', '/user/:id', '/report'].includes(window.location.pathname)) return null;

  return <div>Header</div>;
};

export default Header;
