import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { getPostFolders, Post, getPost, convertFolderNameToSlugParts, convertSlugToFolderName } from '../../blog';
import PostComponent from '../../components/posts/Post';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!Array.isArray(params.slug)) {
    throw new Error(`Cannot determine the post slug for ${params.slug}!`);
  }

  const postName = convertSlugToFolderName(params.slug);
  const post = await getPost(postName);

  return {
    props: {
      post
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await getPostFolders();

  const paths = files.map((file: string): any  => ({
    params: { slug: convertFolderNameToSlugParts(file) }
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
  return (
    <>
      <Head>
        {useStadandardHeaderTags(post.metaData.title, post.metaData.description)}
      </Head>

      <PostComponent post={post} />
    </>
  );
};

export default PostPage;
