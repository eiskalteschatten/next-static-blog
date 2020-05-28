import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useAmp } from 'next/amp';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { getPostFolders, Post, getPost, convertFolderNameToSlugParts, convertSlugToFolderName } from '../../blog';
import PostComponent from '../../components/posts/Post';
import AmpPost from '../../components/posts/AmpPost';

export const config = { amp: 'hybrid' };

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
  const isAmp = useAmp();

  return (
    <>
      <Head>
        {useStadandardHeaderTags({
          title: post.metaData.title,
          description: post.metaData.description,
          keywords: post.metaData.tags
        })}

        {post.metaData.titleImage && (
          <link rel='preload' href={post.metaData.titleImage} as='image' />
        )}
      </Head>

      {isAmp ? (
        <AmpPost post={post} />
      ) : (
        <PostComponent post={post} />
      )}
    </>
  );
};

export default PostPage;
