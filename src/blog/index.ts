import fs from 'fs';
import path from 'path';

const postsFolder = path.resolve(`${process.cwd()}/src/blog/posts`);

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


export const getAllPostFiles = (): Promise<string[]> =>
  new Promise((resolve, reject): void => {
    fs.readdir(postsFolder, async (error: Error, files: string[]): Promise<void> => {
      if (error) {
        reject(error);
      }

      resolve(files.reverse());
    });
  });

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
  let files = await getAllPostFiles();
  const data: PostMetaData[] = [];

  if (count) {
    files = files.splice(0, count);
  }

  for (const file of files) {
    const postMetaData = await getPostMetaData(file);
    data.push(postMetaData);
  }

  return data;
};

export const getAllPosts = async (): Promise<any> => {

};
