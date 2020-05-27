import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { PostMetaData, getMetaDataForArchivePosts, getPostFolders, convertFolderNameToSlugParts } from '../../blog';

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

      <Link href='/' passHref>
        <a>Home</a>
      </Link>

      <div>
        These are all of the posts:
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

export default ArchivesPage;
