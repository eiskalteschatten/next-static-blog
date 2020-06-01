import React from 'react';

import Container from 'react-bootstrap/Container';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Container>
        Project by <a href='https://www.alexseifert.com' target='_blank' rel='noreferrer'>Alex Seifert</a>
      </Container>
    </div>
  );
};

export default Footer;
