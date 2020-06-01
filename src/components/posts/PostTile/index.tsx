import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Col from 'react-bootstrap/Col';

import styles from './PostTile.module.scss';

import { PostMetaData } from '~/blog';

interface Props {
  metaData: PostMetaData;
}

const PostTile: React.FC<Props> = ({ metaData }) => {
  return (
    <Col md={6} lg={4} className={styles.postTile}>
      <Link href='/post/[...slug]' as={`/post/${metaData.slug}`} passHref>
        <a className={styles.link}>
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
            <ReactMarkdown source={metaData.excerpt} />
          )}
        </a>
      </Link>
    </Col>
  );
};

export default PostTile;
