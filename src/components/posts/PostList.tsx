import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Row from 'react-bootstrap/Row';

import { PostMetaData } from '../../blog';
import PostTile from './PostTile';

interface Props {
  postMetaData: PostMetaData[];
}

const PostList: React.FC<Props> = ({ postMetaData }) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const maxPosts = parseInt(process.env.NEXT_PUBLIC_MAX_POSTS_PER_PAGE);
  const offset = maxPosts * (page - 1);
  const pageCount = Math.ceil(postMetaData.length / maxPosts);

  // Create a new post metadata object to splice from so that the passed prop (which is a reference)
  // isn't affected. Strange things happen otherwise.
  const newPostMetaData = Object.assign([], postMetaData);
  const splicedData = newPostMetaData.splice(offset, offset + maxPosts);

  return (
    <>
      <Row>
        {splicedData && splicedData.length > 0 ? splicedData.map((metaData: PostMetaData, index: number) => (
          <PostTile key={index} metaData={metaData} />
        )) : (
          <div>
            No posts found!
          </div>
        )}
      </Row>

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
