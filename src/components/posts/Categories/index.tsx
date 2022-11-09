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
        <Link href='/category/[slug]' as={`/category/${categories[categoryKey].slug}`} className={styles.categoryPill} key={index}>
          {categories[categoryKey].name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
