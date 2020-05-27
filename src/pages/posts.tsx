import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import useStadandardHeaderTags from '../lib/useStandardHeaderTags';
import { getMetaDataForPosts, PostMetaData } from '../blog';
import PostList from '../components/PostList';


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
    <>
      <Head>
        {useStadandardHeaderTags('All Posts')}
      </Head>

      <Link href='/' passHref>
        <a>Home</a>
      </Link>

      <div>
        These are all of the posts:
      </div>

      <PostList postMetaData={postMetaData} />
    </>
  );
};

export default PostsPage;
