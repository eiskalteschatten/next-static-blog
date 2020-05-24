export interface PostMetaData {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorLink?: string;
  titleImage?: string;
  description: string;
  categories: string[];
  tags?: string[];
  publishedDate: string;
  excerpt?: string;
}


export const getPostMetaData = async (postName: string): Promise<PostMetaData> => {
  return {
    id: 'test',
    slug: 'test',
    title: 'test',
    author: 'test',
    authorLink: 'test',
    titleImage: 'test',
    description: 'test',
    categories: ['test'],
    tags: ['test'],
    publishedDate: new Date().toISOString(),
    excerpt: 'test'
  };
};

export const getMetaDataForPosts = async (count?: number): Promise<PostMetaData[]> => {
  const postMetaData = await getPostMetaData('');
  return [postMetaData];
};

export const getAllPosts = async (): Promise<any> => {

};
