import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { PostMetaData } from '../blog';

interface Props {
  postMetaData: PostMetaData[];
}

const PostList: React.FC<Props> = ({ postMetaData }) => {
  return (
    <>
      {postMetaData ? postMetaData.map((metaData: PostMetaData, index: number) => (
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
      )) : (
        <div>
          No posts found!
        </div>
      )}
    </>
  );
};

export default PostList;
