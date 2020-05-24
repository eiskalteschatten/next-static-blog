import React from 'react';
import { GetStaticProps } from 'next';

import { getMetaDataForPosts, PostMetaData } from '../blog';

interface Props {
  postMetaData: PostMetaData[];
}

const Home: React.FC<Props> = ({ postMetaData }) => {
  return (
    <>
      {JSON.stringify(postMetaData)}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postMetaData = await getMetaDataForPosts(10);

  return {
    props: {
      postMetaData
    }
  };
};

export default Home;
