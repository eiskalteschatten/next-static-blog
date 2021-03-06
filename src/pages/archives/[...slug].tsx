import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import useSeoTags from '~/lib/useSeoTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { PostMetaData, getMetaDataForArchivePosts, getPostFolders, convertFolderNameToSlugParts } from '~/blog';
import PostList from '~/components/posts/PostList';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params.slug.length !== 2) {
    throw new Error('Cannot determine the month and year!');
  }

  const year = Number(params.slug[0]);
  const month = Number(params.slug[1]);
  const postMetaData = await getMetaDataForArchivePosts(year, month);

  return {
    props: {
      postMetaData,
      year,
      month
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
  year: number;
  month: number;
}

const ArchivesPage: React.FC<Props> = ({ postMetaData, year, month }) => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(month - 1);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const title = `Archives for ${monthName} ${year}`;

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

      <h1>
        {monthName} {year}
      </h1>

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default ArchivesPage;
