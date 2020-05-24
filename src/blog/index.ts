import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

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

interface ParsedPost {
  metaData: PostMetaData;
  body: string;
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

export const parsePostFile = (postName: string): Promise<ParsedPost> =>
  new Promise((resolve, reject): void => {
    fs.readFile(`${postsFolder}/${postName}`, 'utf8', async (error: Error, data: string): Promise<void> => {
      if (error) {
        reject(error);
      }

      const parsedParts = data.split('---');

      resolve({
        metaData: YAML.parse(parsedParts[1]),
        body: parsedParts[2]
      });
    });
  });

export const getMetaDataForPosts = async (count?: number): Promise<PostMetaData[]> => {
  try {
    let files = await getAllPostFiles();
    const data: PostMetaData[] = [];

    if (count) {
      files = files.splice(0, count);
    }

    for (const file of files) {
      const parsedPost = await parsePostFile(file);
      data.push(parsedPost.metaData);
    }

    return data;
  }
  catch(error) {
    console.error(error);
  }
};

export const getAllPosts = async (): Promise<any> => {

};
