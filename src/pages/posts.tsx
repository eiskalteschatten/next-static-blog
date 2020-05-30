import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import useStadandardHeaderTags from '~/lib/useStandardHeaderTags';
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
  return (
    <Container>
      <Head>
        {useStadandardHeaderTags({ title: 'All Posts' })}
      </Head>

      <div>
        These are all of the posts:
      </div>

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default PostsPage;
