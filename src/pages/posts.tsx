import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import useSeoTags from '~/lib/useSeoTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { getMetaDataForPosts, PostMetaData } from '~/blog';
import PostList from '~/components/posts/PostList';


export const getStaticProps: GetStaticProps = async () => {
  const postMetaData = await getMetaDataForPosts();

  return {
    props: {
      postMetaData
    }
  };
};

interface Props {
  postMetaData: PostMetaData[];
}

const PostsPage: React.FC<Props> = ({ postMetaData }) => {
  const title = 'All Posts';

  return (
    <Container>
      <Head>
        {useSeoTags({ title })}
        {useSchemaOrg({
          webpage: {
            pageTitle: title
          },
          collectionPage: true
        })}
      </Head>

      <div>
        These are all of the posts:
      </div>

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default PostsPage;
