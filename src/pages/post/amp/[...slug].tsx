import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import useStadandardHeaderTags from '../../../lib/useStandardHeaderTags';
import { getPostFolders, Post, getPost, convertFolderNameToSlugParts, convertSlugToFolderName } from '../../../blog';
import AmpPost from '../../../components/posts/AmpPost';

export const config = { amp: true };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!Array.isArray(params.slug)) {
    throw new Error(`Cannot determine the post slug for ${params.slug}!`);
  }

  const postName = convertSlugToFolderName(params.slug);
  const post = await getPost(postName);

  return {
    props: {
      post,
      slug: params.slug.join('/')
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
  slug: string;
}

const PostPage: React.FC<Props> = ({ post, slug }) => {
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

        <link rel='canonical' href={`/post/${slug}`} />

        <style jsx global>{`
          body {
            background: red;
          }
        `}</style>
      </Head>

      <AmpPost post={post} />
    </>
  );
};

export default PostPage;
