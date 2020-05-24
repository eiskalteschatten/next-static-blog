import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const postsFolder = path.resolve(`${process.cwd()}/src/blog/posts`);

export interface PostMetaData {
  id: string;
  title: string;
  author: string;
  authorLink?: string;
  titleImage?: string;
  description: string;
  categories: string[];
  tags?: string[];
  publishedDate: string;
  excerpt?: string;
  slug: string;
}

export interface Post {
  metaData: PostMetaData;
  body: string;
}


export const convertFileNameToSlug = (fileName: string): string => {
  fileName = path.parse(fileName).name;
  const slugParts = fileName.split('_');

  if (slugParts.length !== 2) {
    throw new Error(`${fileName} is an invalid file name and should follow this pattern: '2020-05-24_example-post'.`);
  }

  const date = slugParts[0].replace(/-/g, '/');
  return `${date}/${slugParts[1]}`;
};


export const convertFileNameToSlugParts = (fileName: string): string[] => {
  const slug = convertFileNameToSlug(fileName);
  return slug.split('/');
};

export const convertSlugToFileName = (slugParts: string[]): string => {
  if (slugParts.length !== 4) {
    throw new Error(`${JSON.stringify(slugParts)} is an invalid slug and should follow this pattern: '2020/05/24/example-post'.`);
  }

  return `${slugParts[0]}-${slugParts[1]}-${slugParts[2]}_${slugParts[3]}.md`;
};


export const getAllPostFiles = (): Promise<string[]> =>
  new Promise((resolve, reject): void => {
    fs.readdir(postsFolder, async (error: Error, files: string[]): Promise<void> => {
      if (error) {
        reject(error);
      }

      resolve(files.reverse());
    });
  });

export const getPost = (postName: string): Promise<Post> =>
  new Promise((resolve, reject): void => {
    fs.readFile(`${postsFolder}/${postName}`, 'utf8', async (error: Error, data: string): Promise<void> => {
      if (error) {
        reject(error);
      }

      const parsedParts = data.split('---');
      const metaData = {
        ...YAML.parse(parsedParts[1]),
        slug: convertFileNameToSlug(postName)
      };

      resolve({
        metaData,
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
      const parsedPost = await getPost(file);
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
