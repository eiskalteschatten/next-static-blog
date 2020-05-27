import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { PostMetaData, getMetaDataForArchivePosts, getPostFolders, convertFolderNameToSlugParts } from '../../blog';
import PostList from '../../components/PostList';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params.slug.length !== 2) {
    throw new Error('Cannot determine the month and year!');
  }

  const postMetaData = await getMetaDataForArchivePosts(Number(params.slug[0]), Number(params.slug[1]));

  return {
    props: {
      postMetaData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await getPostFolders();

  const paths = files.map((file: string): any  => {
    const slugParts = convertFolderNameToSlugParts(file);
    const slug = [slugParts[0], slugParts[1]];
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false
  };
};

interface Props {
  postMetaData: PostMetaData[];
}

const ArchivesPage: React.FC<Props> = ({ postMetaData }) => {
  return (
    <>
      <Head>
        {useStadandardHeaderTags('Archives')}
      </Head>

      <PostList postMetaData={postMetaData} />

      <Link href='/' passHref>
        <a>Home</a>
      </Link>
    </>
  );
};

export default ArchivesPage;
