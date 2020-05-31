import React from 'react';

import styles from './Avatar.module.scss';

interface Props {
  src: string;
  alt?: string;
}

const Avatar: React.FC<Props> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className={styles.avatar} />
  );
};

export default Avatar;
