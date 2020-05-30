import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import useSeoTags from '~/lib/useSeoTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { getMetaDataForPosts, PostMetaData } from '~/blog';
import PostTile from '~/components/posts/PostTile';

export const getStaticProps: GetStaticProps = async () => {
  const postMetaData = await getMetaDataForPosts(10);

  return {
    props: {
      postMetaData
    }
  };
};

interface Props {
  postMetaData: PostMetaData[];
}

const Home: React.FC<Props> = ({ postMetaData }) => {
  return (
    <Container>
      <Head>
        {useSeoTags()}
        {useSchemaOrg()}
      </Head>

      <div>
        These are the latest 10 posts:
      </div>

      <Row>
        {postMetaData.map((metaData: PostMetaData, index: number) => (
          <PostTile key={index} metaData={metaData} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
