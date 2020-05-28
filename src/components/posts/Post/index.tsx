import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Container from 'react-bootstrap/Container';

import styles from './Post.module.scss';

import categories from '../../../blog/categories';
import { Post } from '../../../blog';
import CodeBlock from '../../CodeBlock';
import AuthorBlock from '../../AuthorBlock';

interface Props {
  post: Post;
}

const PostComponent: React.FC<Props> = ({ post }) => {
  const publishedDate = new Date(post.metaData.publishedDate);
  // const publishedMonth = ('0' + (publishedDate.getMonth()+1)).slice(-2);
  // const archivesLink = `/archives/${publishedDate.getFullYear()}/${publishedMonth}`;

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
          {publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {publishedDate.toLocaleTimeString('en-US')}<br />
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
          Categories: {post.metaData.categories.map((category: string, index: number): any => (
            <span key={index}>
              <Link href={`/category/${categories[category].slug}`} passHref>
                <a>{categories[category].name}</a>
              </Link>,&nbsp;
            </span>
          ))}<br />
          Tags: {JSON.stringify(post.metaData.tags)}
        </div>
      </Container>
    </>
  );
};

export default PostComponent;
