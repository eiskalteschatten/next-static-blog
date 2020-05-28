import React from 'react';
import ReactMarkdown from 'react-markdown';

import Container from 'react-bootstrap/Container';

import styles from './AmpPost.module.scss';

import { Post } from '../../../blog';
import CodeBlock from '../../CodeBlock';
import AuthorBlock from '../../AuthorBlock';
import Categories from '../Categories';

interface Props {
  post: Post;
}

const AmpPost: React.FC<Props> = ({ post }) => {
  const publishedDate = new Date(post.metaData.publishedDate);

  return (
    <>
      {post.metaData.titleImage && (
        <amp-img
          src={post.metaData.titleImage}
          height='500'
          width='1200'
          layout='responsive'
          alt={post.metaData.title}
        />
      )}

      <Container>
        <h1>
          {post.metaData.title}
        </h1>

        <div className={styles.publishedDate}>
          {publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {publishedDate.toLocaleTimeString('en-US')}
        </div>

        <div className={styles.author}>
          <AuthorBlock authorKey={post.metaData.author} />
        </div>

        <div className='mb-5'>
          <ReactMarkdown
            source={post.body}
            renderers={{ code: CodeBlock }}
          />
        </div>

        <div>
          <Categories categoryKeys={post.metaData.categories} />
        </div>
      </Container>
    </>
  );
};

export default AmpPost;
