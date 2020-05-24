import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import useStadandardHeaderTags from '../../lib/useStandardHeaderTags';
import { PostMetaData, getMetaDataForCategoryPosts } from '../../blog';
import categories, { Category } from '../../blog/categories';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let categoryKey;
  let category;

  for (const key in categories) {
    if (categories[key].slug === params.slug) {
      categoryKey = key;
      category = categories[key];
      break;
    }
  }

  const postMetaData = await getMetaDataForCategoryPosts(categoryKey);

  return {
    props: {
      category,
      postMetaData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(categories).map((key: string): any  => ({
    params: { slug: categories[key].slug }
  }));

  return {
    paths,
    fallback: false
  };
};

interface Props {
  category: Category;
  postMetaData: PostMetaData[];
}

const CategoryPage: React.FC<Props> = ({ category, postMetaData }) => {
  return (
    <>
      <Head>
        {useStadandardHeaderTags(category.name, category.description)}
      </Head>

      <h1>
        {category.name}
      </h1>

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
          No posts found for this category
        </div>
      )}

      <Link href='/' passHref>
        <a>Home</a>
      </Link>
    </>
  );
};

export default CategoryPage;
