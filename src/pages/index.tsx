import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { getMetaDataForPosts, PostMetaData } from '../blog';

interface Props {
  postMetaData: PostMetaData[];
}

const Home: React.FC<Props> = ({ postMetaData }) => {
  return (
    <>
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

export const getStaticProps: GetStaticProps = async () => {
  const postMetaData = await getMetaDataForPosts(10);

  return {
    props: {
      postMetaData
    }
  };
};

export default Home;
