import React from 'react';
import Link from 'next/link';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        Blog
      </div>

      <div className={styles.nav}>
        <Link href='/' passHref>
          <a className={styles.navItem}>Home</a>
        </Link>

        <Link href='/posts' passHref>
          <a className={styles.navItem}>All Posts</a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
