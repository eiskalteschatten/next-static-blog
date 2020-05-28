import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { PostMetaData, getMetaDataForAuthorPosts } from '../../blog';
import authors, { Author } from '../../blog/authors';
import PostList from '../../components/posts/PostList';

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
    <Container>
      <Head>
        {useStadandardHeaderTags(author.name, author.bio)}
      </Head>

      <h1>
        {author.name}
      </h1>

      {author.bio && (
        <div>
          {author.bio}
        </div>
      )}

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default AuthorPage;
