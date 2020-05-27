import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { PostMetaData, getMetaDataForAuthorPosts } from '../../blog';
import authors, { Author } from '../../blog/authors';
import PostList from '../../components/PostList';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let authorKey: string;
  let author: Author;

  for (const key in authors) {
    if (key === params.slug) {
      authorKey = key;
      author = authors[key];
      break;
    }
  }

  const postMetaData = await getMetaDataForAuthorPosts(authorKey);

  return {
    props: {
      author,
      postMetaData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(authors).map((key: string): any  => ({
    params: { slug: key }
  }));

  return {
    paths,
    fallback: false
  };
};

interface Props {
  author: Author;
  postMetaData: PostMetaData[];
}

const AuthorPage: React.FC<Props> = ({ author, postMetaData }) => {
  return (
    <>
      <Head>
        {useStadandardHeaderTags(author.name, author.bio)}
      </Head>

      <h1>
        {author.name}
      </h1>

      <PostList postMetaData={postMetaData} />

      <Link href='/' passHref>
        <a>Home</a>
      </Link>
    </>
  );
};

export default AuthorPage;
