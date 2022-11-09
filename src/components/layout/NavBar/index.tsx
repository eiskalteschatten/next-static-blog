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
        <Link href='/' className={styles.navItem}>
          Home
        </Link>

        <Link href='/posts' className={styles.navItem}>
          All Posts
        </Link>

        <Link href='/example' className={styles.navItem}>
          Example Page
        </Link>

        <Link href='/feed.xml' className={styles.navItem}>
          RSS Feed
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
