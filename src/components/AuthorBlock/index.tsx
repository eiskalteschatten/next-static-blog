import React from 'react';
import Link from 'next/link';

import styles from './AuthorBlock.module.scss';

import Avatar from '../Avatar';
import authors from '../../blog/authors';

interface Props {
  authorKey: string;
}

const AuthorBlock: React.FC<Props> = ({ authorKey }) => {
  const author = authors[authorKey];

  return (
    <>
      {author.avatar && (
        <span className={styles.avatar}>
          <Avatar src={author.avatar} alt={author.name} />
        </span>
      )}

      <Link href={`/author/${authorKey}`} passHref>
        <a>{author.name}</a>
      </Link>
    </>
  );
};

export default AuthorBlock;
