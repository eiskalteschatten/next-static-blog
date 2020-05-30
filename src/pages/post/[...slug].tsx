import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import useStadandardHeaderTags from '~/lib/useStandardHeaderTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { getPostFolders, Post, getPost, convertFolderNameToSlugParts, convertSlugToFolderName } from '~/blog';
import categories from '~/blog/categories';
import PostComponent from '~/components/posts/Post';

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
        {useStadandardHeaderTags({
          title: post.metaData.title,
          description: post.metaData.description,
          keywords: post.metaData.tags
        })}

        {post.metaData.titleImage && (
          <link rel='preload' href={post.metaData.titleImage} as='image' />
        )}

        {useSchemaOrg({
          webpage: {
            pageTitle: post.metaData.title,
            pageDescription: post.metaData.description
          },
          article: {
            titleImage: post.metaData.titleImage,
            headline: post.metaData.title,
            datePublished: post.metaData.publishedDate,
            dateModified: post.metaData.updatedAt,
            keywords: post.metaData.tags.join(','),
            articleSection: post.metaData.categories.map((key: string): string => categories[key].name).join(',')
          }
        })}
      </Head>

      <PostComponent post={post} />
    </>
  );
};

export default PostPage;
