import React from 'react';
import { useAmp } from 'next/amp';

import styles from './Avatar.module.scss';

interface Props {
  src: string;
  alt?: string;
}

const Avatar: React.FC<Props> = ({ src, alt }) => {
  const isAmp = useAmp();

  return (
    <>
      {isAmp ? (
        <amp-img
          src={src}
          height='50'
          width='50'
          layout='fixed'
          alt={alt}
        />
      ) : (
        <img src={src} alt={alt} className={styles.avatar} />
      )}
    </>
  );
};

export default Avatar;
