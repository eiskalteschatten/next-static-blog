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


export const getPostFiles = async (count?: number): Promise<string[]> => {
  try {
    let files = await fs.promises.readdir(postsFolder);
    files = files.filter((file: string): boolean => path.parse(file).ext === '.md');
    files = files.reverse();

    if (count) {
      files = files.splice(0, count);
    }

    return files;
  }
  catch(error) {
    console.error(error);
  }
};


export const getPost = async (postName: string): Promise<Post> => {
  try {
    const post = `${postsFolder}/${postName}`;

    await fs.promises.access(post);

    const data = await fs.promises.readFile(post, 'utf8');
    const parsedParts = data.split('---');
    const parsedMetaData = YAML.parse(parsedParts[1]);

    const metaData = {
      ...parsedMetaData,
      excerpt: parsedMetaData.excerpt?.trim(),
      slug: convertFileNameToSlug(postName)
    };

    return {
      metaData,
      body: parsedParts[2].trim()
    };
  }
  catch(error) {
    console.error(error);
  }
};


export const getMetaDataForPosts = async (count?: number): Promise<PostMetaData[]> => {
  try {
    const files = await getPostFiles(count);
    const metaData: PostMetaData[] = [];

    for (const file of files) {
      const parsedPost = await getPost(file);
      metaData.push(parsedPost.metaData);
    }

    return metaData;
  }
  catch(error) {
    console.error(error);
  }
};


export const getMetaDataForCategoryPosts = async (categoryKey: string, count?: number): Promise<PostMetaData[]> => {
  const allPosts = await getMetaDataForPosts(count);
  return allPosts.filter((metaData: PostMetaData): boolean => metaData.categories.includes(categoryKey));
};
