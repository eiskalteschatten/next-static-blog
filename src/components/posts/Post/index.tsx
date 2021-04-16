import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';

import styles from './Post.module.scss';

import ReactMarkdown from '../../elements/ReactMarkDown';
import { Post } from '~/blog';
import AuthorBlock from '../../elements/AuthorBlock';
import Categories from '../Categories';

interface Props {
  post: Post;
}

const PostComponent: React.FC<Props> = ({ post }) => {
  const publishedDate = new Date(post.metaData.publishedDate);
  const publishedMonth = ('0' + (publishedDate.getMonth()+1)).slice(-2);
  const archivesLink = `/archives/${publishedDate.getFullYear()}/${publishedMonth}`;

  return (
    <>
      {post.metaData.titleImage && (
        <div
          className={styles.titleImage}
          style={{
            backgroundImage: `url('${post.metaData.titleImage}')`
          }}
        />
      )}

      <Container>
        <h1>
          {post.metaData.title}
        </h1>

        <div className={styles.publishedDate}>
          {publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {publishedDate.toLocaleTimeString('en-US')}
          <Link href='/archives/[...slug]' as={archivesLink} passHref>
            <a className='btn btn-sm btn-light ml-3'>&#x2192;</a>
          </Link>
        </div>

        <div className={styles.author}>
          <AuthorBlock authorKey={post.metaData.author} />
        </div>

        <div className='mb-5'>
          <ReactMarkdown>
            {post.body}
          </ReactMarkdown>
        </div>

        <div>
          <Categories categoryKeys={post.metaData.categories} />
        </div>
      </Container>
    </>
  );
};

export default PostComponent;
