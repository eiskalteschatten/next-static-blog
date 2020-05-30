import fs from 'fs';
import path from 'path';
import marked from 'marked';
import RSS from 'rss';

import siteSettings from '../src/siteSettings';
import { convertFolderNameToSlug } from '../src/blog';
import authors from '../src/blog/authors';
import categories from '../src/blog/categories';

const postsFolder = path.resolve(process.cwd(), 'src/blog/posts');

const url = siteSettings.siteUrl;

const feed = new RSS({
  title: siteSettings.siteTitle,
  description: siteSettings.siteDescription,
  'feed_url': `${url}/feed.xml`,
  'site_url': `${url}`,
  copyright: siteSettings.copyright,
  language: siteSettings.siteLanguage,
  pubDate: new Date().toISOString()
});

console.log('Building the RSS feed...');

let postFolders = fs.readdirSync(postsFolder);
postFolders = postFolders.filter(folder => fs.lstatSync(path.resolve(postsFolder, folder)).isDirectory());
postFolders = postFolders.reverse();

for (const folder of postFolders) {
  const folderPath = path.resolve(postsFolder, folder);

  const metaDataString = fs.readFileSync(`${folderPath}/meta.json`, 'utf8');
  const metaData = JSON.parse(metaDataString);

  const contentMarkdown = fs.readFileSync(`${folderPath}/index.md`, 'utf8');
  const contentHtml = marked(contentMarkdown);

  const slug = convertFolderNameToSlug(folder);

  feed.item({
    title: metaData.title,
    description: contentHtml,
    url: `${url}/post/${slug}`,
    categories: metaData.categories.map((key: string): string => categories[key].name),
    author: authors[metaData.author].name,
    date: metaData.publishedDate
  });
}


const xml = feed.xml();
const writeFile = path.resolve(process.cwd(), 'public/feed.xml');

fs.writeFileSync(writeFile, xml);

console.log(`RSS feed was saved to ${writeFile}`);
