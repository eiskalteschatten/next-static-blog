import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { PostMetaData } from '../blog';

interface Props {
  postMetaData: PostMetaData[];
  page: number;
}

const PostList: React.FC<Props> = ({ postMetaData, page }) => {
  const maxPosts = parseInt(process.env.NEXT_PUBLIC_MAX_POSTS_PER_PAGE);
  const offset = maxPosts * (page - 1);
  const pageCount = Math.ceil(postMetaData.length / maxPosts);

  // Create a new post metadata object to splice from so that the passed prop (which is a reference)
  // isn't affected. Strange things happen otherwise.
  const newPostMetaData = Object.assign([], postMetaData);
  const splicedData = newPostMetaData.splice(offset, offset + maxPosts);

  return (
    <>
      {splicedData && splicedData.length > 0 ? splicedData.map((metaData: PostMetaData, index: number) => (
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

      <div>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((count: number) => (
          <span key={count}>
            <Link href={`?page=${count}`} passHref>
              <a>{count}</a>
            </Link>&nbsp;|&nbsp;
          </span>
        ))}
      </div>
    </>
  );
};

export default PostList;
