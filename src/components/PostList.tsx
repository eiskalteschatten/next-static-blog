import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { PostMetaData } from '../blog';

interface Props {
  postMetaData: PostMetaData[];
}

const PostList: React.FC<Props> = ({ postMetaData }) => {
  const [page, setPage] = useState<number>(1);
  const maxPosts = parseInt(process.env.NEXT_PUBLIC_MAX_POSTS_PER_PAGE);
  const offset = maxPosts * (page - 1);
  const pageCount = Math.ceil(postMetaData.length / maxPosts);

  // Create a new post metadata object to splice from so that the passed prop (which is a reference)
  // isn't affected. Strange things happen otherwise.
  const newPostMetaData = Object.assign([], postMetaData);
  const splicedData = newPostMetaData.splice(offset, offset + maxPosts);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(urlParams.get('page')) || 1;
    setPage(pageParam);
  }, []);

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
          <>
            <Link href={`?page=${count}`} passHref key={count}>
              <a>{count}</a>
            </Link>&nbsp;|&nbsp;
          </>
        ))}
      </div>
    </>
  );
};

export default PostList;
