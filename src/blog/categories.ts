export interface Category {
  name: string;
  slug: string;
  description: string;
}

export default {
  news: {
    name: 'News',
    slug: 'news',
    description: 'News'
  },
  testCategory: {
    name: 'Test Category',
    slug: 'test-category',
    description: 'Some sort of test category'
  },
  anotherCategory: {
    name: 'Another Category',
    slug: 'another-category',
    description: 'Another sort of test category'
  }
};
