import React from 'react';
import { useRouter } from 'next/router';

import siteSettings from '../siteSettings';

interface Options {
  title?: string;
  description?: string;
  keywords?: string[];
}

const useStandardHeaderTags = (options?: Options): any => {
  const { title, description, keywords } = options || {};
  const finalDescription = description || 'A static blog';
  const router = useRouter();

  return (
    <>
      {title
        ? (<title>{title} | {siteSettings.siteTitle}</title>)
        : (<title>{siteSettings.siteTitle}</title>)
      }

      <meta name='description' content={finalDescription} />

      {keywords && (
        <meta name='keywords' content={keywords.join(',')} />
      )}

      <link rel='canonical' href={`${siteSettings.siteUrl}${router.asPath}`} />
    </>
  );
};

export default useStandardHeaderTags;
