import React from 'react';
import Link from 'next/link';

import Col from 'react-bootstrap/Col';

import ReactMarkdown from '../../elements/ReactMarkdown';
import { PostMetaData } from '~/blog';

import styles from './PostTile.module.scss';


interface Props {
  metaData: PostMetaData;
}

const PostTile: React.FC<Props> = ({ metaData }) => {
  return (
    <Col md={6} lg={4} className={styles.postTile}>
      <Link href='/post/[...slug]' as={`/post/${metaData.slug}`} className={styles.link}>
        <div
          className={styles.titleImage}
          style={{
            backgroundImage: `url('${metaData.titleImage}')`
          }}
        />

        <h2 className={styles.title}>
          {metaData.title}
        </h2>

        {metaData.excerpt && (
          <ReactMarkdown>{metaData.excerpt}</ReactMarkdown>
        )}
      </Link>
    </Col>
  );
};

export default PostTile;
