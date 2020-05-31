import React from 'react';
import Link from 'next/link';

import styles from './Categories.module.scss';

import categories from '~/blog/categories';

interface Props {
  categoryKeys: string[];
}

const Categories: React.FC<Props> = ({ categoryKeys }) => {
  return (
    <div className={styles.categories}>
      {categoryKeys.map((categoryKey: string, index: number): any => (
        <Link href='/category/[slug]' as={`/category/${categories[categoryKey].slug}`} passHref key={index}>
          <a className={styles.categoryPill}>
            {categories[categoryKey].name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
