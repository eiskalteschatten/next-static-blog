import path from 'path';
import fs from 'fs';

import siteSettings from '../src/siteSettings';

import { convertFolderNameToSlug } from '../src/blog';
import authors from '../src/blog/authors';
import categories from '../src/blog/categories';

const url = siteSettings.siteUrl;
const now = new Date().toISOString();

const pagesFolder = path.resolve(process.cwd(), 'src/pages');
const postsFolder = path.resolve(process.cwd(), 'src/blog/posts');

let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">`;


console.log('Building the sitemap.xml...');


let postFolders = fs.readdirSync(postsFolder);
postFolders = postFolders.filter(folder => fs.lstatSync(path.resolve(postsFolder, folder)).isDirectory());
postFolders = postFolders.reverse();

for (const folder of postFolders) {
  const folderPath = path.resolve(postsFolder, folder);

  const metaDataString = fs.readFileSync(`${folderPath}/meta.json`, 'utf8');
  const metaData = JSON.parse(metaDataString);

  const slug = convertFolderNameToSlug(folder);

  xml += `
    <url>
      <loc>${url}/post/${slug}</loc>
      <lastmod>${metaData.updatedAt}</lastmod>
    </url>
  `;
}

for (const key in authors) {
  xml += `
    <url>
      <loc>${url}/author/${key}</loc>
      <lastmod>${now}</lastmod>
    </url>
  `;
}

for (const key in categories) {
  xml += `
    <url>
      <loc>${url}/category/${categories[key].slug}</loc>
      <lastmod>${now}</lastmod>
    </url>
  `;
}


const scanPages = (folder: string): void => {
  const pages = fs.readdirSync(folder);

  for (const page of pages) {
    const fullPath = path.resolve(folder, page);

    if (fs.lstatSync(fullPath).isDirectory()) {
      scanPages(fullPath);
    }
    else {
      if (path.extname(fullPath) === '.tsx' && page.charAt(0) !== '_' && page.charAt(0) !== '[') {
        const subdir = path.dirname(fullPath).replace(pagesFolder, '');
        const slug = page === 'index.tsx' ? '' : `/${path.basename(page, '.tsx')}`;

        xml += `
          <url>
            <loc>${url}${subdir}${slug}}</loc>
            <lastmod>${now}</lastmod>
          </url>
        `;
      }
    }
  }
};

scanPages(pagesFolder);

xml += '</urlset>';

const writeFile = path.resolve(process.cwd(), 'public/sitemap.xml');

fs.writeFileSync(writeFile, xml);

console.log(`The sitemap.xml was saved to ${writeFile}`);
