import React from 'react';

import Container from 'react-bootstrap/Container';

import NavBar from './NavBar';

interface Props {
  children?: any;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />

      <Container>
        {children}
      </Container>
    </>
  );
};

export default MainLayout;
