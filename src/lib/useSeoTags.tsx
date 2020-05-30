import React from 'react';
import { useRouter } from 'next/router';

import siteSettings from '~/siteSettings';

interface Options {
  title?: string;
  description?: string;
  keywords?: string[];
  pageType?: string;
  publishedDate?: string;
  updatedAt?: string;
  image?: string;
  author?: string;
  authorFirstName?: string;
  authorLastName?: string;
}

const useSeoTags = (options?: Options): any => {
  const router = useRouter();
  const { title, description, keywords, pageType, publishedDate, updatedAt, image, author, authorFirstName, authorLastName } = options || {};
  const finalDescription = description || siteSettings.siteDescription;
  const finalTitle = title ? `${title} | ${siteSettings.siteTitle}` : siteSettings.siteTitle;
  const finalType = pageType || 'website';

  return (
    <>
      <title>{finalTitle}</title>

      {keywords && (
        <meta name='keywords' content={keywords.join(',')} />
      )}

      <meta name='description' content={finalDescription} />

      <meta property='og:locale' content={siteSettings.siteLanguage.replace('-', '_')} />
      <meta property='og:type' content={finalType} />
      <meta property='og:title' content={finalTitle} />
      <meta property='og:description' content={finalDescription} />
      <meta property='og:url' content={`${siteSettings.siteUrl}${router.asPath}`} />
      <meta property='og:site_name' content={siteSettings.siteTitle} />

      {image && (
        <meta property='og:image' content={`${siteSettings.siteUrl}${image}`} />
      )}

      {pageType === 'article' && publishedDate && (
        <meta property='article:published_time' content={publishedDate} />
      )}

      {pageType === 'article' && updatedAt && (
        <meta property='article:modified_time' content={updatedAt} />
      )}

      {pageType === 'article' && author && (
        <meta property='article:author' content={author} />
      )}

      {pageType === 'article' && keywords && (
        <meta property='article:tag' content={keywords.join(',')} />
      )}

      {pageType === 'profile' && authorFirstName && (
        <meta property='profile:first_name' content={authorFirstName} />
      )}

      {pageType === 'profile' && authorLastName && (
        <meta property='profile:last_name' content={authorLastName} />
      )}

      <link rel='canonical' href={`${siteSettings.siteUrl}${router.asPath}`} />
    </>
  );
};

export default useSeoTags;
