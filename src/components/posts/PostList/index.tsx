import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Row from 'react-bootstrap/Row';

import styles from './PostList.module.scss';

import { PostMetaData } from '~/blog';
import PostTile from '../PostTile';

interface Props {
  postMetaData: PostMetaData[];
}

const PostList: React.FC<Props> = ({ postMetaData }) => {
  const router = useRouter();
  const [asPath, setAsPath] = useState<string>();
  const page = Number(router.query.page) || 1;
  const maxPosts = parseInt(process.env.NEXT_PUBLIC_MAX_POSTS_PER_PAGE);
  const offset = maxPosts * (page - 1);
  const pageCount = Math.ceil(postMetaData.length / maxPosts);

  // Create a new post metadata object to splice from so that the passed prop (which is a reference)
  // isn't affected. Strange things happen otherwise.
  const newPostMetaData = Object.assign([], postMetaData);
  const splicedData = newPostMetaData.splice(offset, offset + maxPosts);

  useEffect(() => {
    const path = router.asPath.split('?');
    setAsPath(path[0]);
  }, [router.asPath]);

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

      {pageCount > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((count: number) => (
            <span key={count}>
              <Link
                href={{
                  pathname: `${router.route}`,
                  query: { page: count },
                }}
                as={`${asPath}?page=${count}`}
                className={clsx({
                  [styles.link]: true,
                  [styles.active]: page === count
                })}
              >
                {count}
              </Link>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default PostList;
