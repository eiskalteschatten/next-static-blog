import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { getPostFiles, Post, getPost, convertFileNameToSlugParts, convertSlugToFileName } from '../../blog';
import categories from '../../blog/categories';
import CodeBlock from '../../components/CodeBlock';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!Array.isArray(params.slug)) {
    throw new Error(`Cannot determine the post slug for ${params.slug}!`);
  }

  const postName = convertSlugToFileName(params.slug);
  const post = await getPost(postName);

  return {
    props: {
      post
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await getPostFiles();

  const paths = files.map((file: string): any  => ({
    params: { slug: convertFileNameToSlugParts(file) }
  }));

  return {
    paths,
    fallback: false
  };
};

interface Props {
  post: Post;
}

const PostPage: React.FC<Props> = ({ post }) => {
  const publishedDate = new Date(post.metaData.publishedDate);

  return (
    <>
      <Head>
        {useStadandardHeaderTags(post.metaData.title, post.metaData.description)}
      </Head>

      {post.metaData.titleImage && (
        <div>
          <img src={post.metaData.titleImage} alt={post.metaData.title} />
        </div>
      )}

      <h1>
        {post.metaData.title}
      </h1>

      <div>
        Published: {publishedDate.toLocaleDateString()} at {publishedDate.toLocaleTimeString()}<br />
        Author: {post.metaData.author}<br />
        Categories: {post.metaData.categories.map((category: string, index: number): any => (
          <span key={index}>
            <Link href={`/category/${categories[category].slug}`} passHref>
              <a>{categories[category].name}</a>
            </Link>,&nbsp;
          </span>
        ))}<br />
        Tags: {JSON.stringify(post.metaData.tags)}
      </div>

      <div>
        <ReactMarkdown
          source={post.body}
          renderers={{ code: CodeBlock }}
        />
      </div>

      <Link href='/' passHref>
        <a>Home</a>
      </Link>
    </>
  );
};

export default PostPage;
