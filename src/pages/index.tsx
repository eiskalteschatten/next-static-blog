import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import useStadandardHeaderTags from '../lib/useStandardHeaderTags';
import { getMetaDataForPosts, PostMetaData } from '../blog';


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
    <>
      <Head>
        {useStadandardHeaderTags()}
      </Head>

      <div>
        These are the latest 10 posts:
      </div>

      {postMetaData.map((metaData: PostMetaData, index: number) => (
        <div key={index}>
          <Link href={`/post/${metaData.slug}`} passHref>
            <a>
              <div>{metaData.title}</div>

              {metaData.excerpt && (
                <ReactMarkdown source={metaData.excerpt} />
              )}
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Home;
