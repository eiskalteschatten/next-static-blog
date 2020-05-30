import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import styles from './AuthorPage.module.scss';

import useSeoTags from '~/lib/useSeoTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { PostMetaData, getMetaDataForAuthorPosts } from '~/blog';
import authors, { Author } from '~/blog/authors';
import PostList from '~/components/posts/PostList';
import Avatar from '~/components/Avatar';

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
        {useSeoTags({
          title: author.name,
          description: author.bio,
          pageType: 'profile',
          authorFirstName: author.firstName,
          authorLastName: author.lastName
        })}
        {useSchemaOrg({
          webpage: {
            pageTitle: author.name,
            pageDescription: author.bio
          },
          profilePage: {
            name: author.name
          }
        })}
      </Head>

      <h1>
        {author.name}
      </h1>

      {author.website && (
        <a
          href={author.website}
          target='_blank'
          rel='noreferrer'
          className='btn btn-light btn-sm btn-small'
        >
          Website &#x2192;
        </a>
      )}

      <div className={styles.authorInfo}>
        {author.avatar && (
          <div className={styles.avatar}>
            <Avatar src={author.avatar} alt={author.name} />
          </div>
        )}

        {author.bio && (
          <div>
            {author.bio}
          </div>
        )}
      </div>

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default AuthorPage;
