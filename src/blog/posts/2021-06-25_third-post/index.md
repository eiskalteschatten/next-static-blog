---
id: third-post
title: Third Post
author: Alex Seifert
authorLink: https://www.alexseifert.com
titleImage: /images/blog/posts/test-image.jpg
description: This is for the meta-description tag in the header for SEO.
categories: ['news']
tags: ['news tag', 'another tag']
publishedDate: 2021-06-25T07:38:13
updatedAt: 2020-06-25T07:38:13
excerpt: >
  This is a longer bit of text that can use **Markdown** and be used as an excerpt to be shown on other pages.
---

This is where the actual **post** is written.

Random code:

```js
export const getStaticPaths: GetStaticPaths = async () => {
  const files = await getAllPostFiles();

  const paths = files.map((file: string): any  => ({
    params: { slug: convertFolderNameToSlugParts(file) }
  }));

  return {
    paths,
    fallback: true
  };
};
```
