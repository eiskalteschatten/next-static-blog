import React from 'react';
import Link from 'next/link';

import styles from './AuthorAvatar.module.scss';

import authors from '../../blog/authors';

interface Props {
  authorKey: string;
}

const AuthorAvatar: React.FC<Props> = ({ authorKey }) => {
  const author = authors[authorKey];

  return (
    <>
      <img src={author.avatar} alt={author.name} className={styles.avatar} />

      <Link href={`/author/${authorKey}`} passHref>
        <a>{author.name}</a>
      </Link>
    </>
  );
};

export default AuthorAvatar;
