import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';

import useStadandardHeaderTags from '~/lib/useStandardHeaderTags';
import useSchemaOrg from '~/lib/useSchemaOrg';
import { PostMetaData, getMetaDataForCategoryPosts } from '~/blog';
import categories, { Category } from '~/blog/categories';
import PostList from '~/components/posts/PostList';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let categoryKey: string;
  let category: Category;

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
    <Container>
      <Head>
        {useStadandardHeaderTags({
          title: category.name,
          description: category.description
        })}
        {useSchemaOrg({
          webpage: {
            pageTitle: category.name,
            pageDescription: category.description
          },
          collectionPage: true
        })}
      </Head>

      <h1>
        {category.name}
      </h1>

      <PostList postMetaData={postMetaData} />
    </Container>
  );
};

export default CategoryPage;
