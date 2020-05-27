import fs from 'fs';
import path from 'path';

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


export const convertFolderNameToSlug = (folderName: string): string => {
  folderName = path.parse(folderName).name;
  const slugParts = folderName.split('_');

  if (slugParts.length !== 2) {
    throw new Error(`${folderName} is an invalid folder name and should follow this pattern: '2020-05-24_example-post'.`);
  }

  const date = slugParts[0].replace(/-/g, '/');
  return `${date}/${slugParts[1]}`;
};


export const convertFolderNameToSlugParts = (folderName: string): string[] => {
  const slug = convertFolderNameToSlug(folderName);
  return slug.split('/');
};


export const convertSlugToFolderName = (slugParts: string[]): string => {
  if (slugParts.length !== 4) {
    throw new Error(`${JSON.stringify(slugParts)} is an invalid slug and should follow this pattern: '2020/05/24/example-post'.`);
  }

  return `${slugParts[0]}-${slugParts[1]}-${slugParts[2]}_${slugParts[3]}`;
};


export const getPostFolders = async (count?: number): Promise<string[]> => {
  try {
    let folders = await fs.promises.readdir(postsFolder);
    folders = folders.filter((folder: string): boolean => fs.lstatSync(path.resolve(postsFolder, folder)).isDirectory());
    folders = folders.reverse();

    if (count) {
      folders = folders.splice(0, count);
    }

    return folders;
  }
  catch(error) {
    console.error(error);
  }
};


export const getMetaDataForPost = async (postName: string): Promise<PostMetaData> => {
  try {
    const metaDataString = await fs.promises.readFile(`${postsFolder}/${postName}/meta.json`, 'utf8');
    const metaData = JSON.parse(metaDataString);
    metaData.slug = convertFolderNameToSlug(postName);
    return metaData;
  }
  catch(error) {
    console.error(error);
  }
};


export const getPost = async (postName: string): Promise<Post> => {
  try {
    const post = `${postsFolder}/${postName}/index.md`;
    await fs.promises.access(post);
    const body = await fs.promises.readFile(post, 'utf8');

    const metaData = await getMetaDataForPost(postName);

    return {
      metaData,
      body
    };
  }
  catch(error) {
    console.error(error);
  }
};


export const getMetaDataForPosts = async (count?: number): Promise<PostMetaData[]> => {
  try {
    const folders = await getPostFolders(count);
    const metaData: PostMetaData[] = [];

    for (const folder of folders) {
      const parsedPost = await getMetaDataForPost(folder);
      metaData.push(parsedPost);
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
