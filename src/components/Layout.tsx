import React from 'react';

import NavBar from './NavBar';

interface Props {
  children?: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
