import React from 'react';

interface Options {
  title?: string;
  description?: string;
  keywords?: string[];
}

const useStandardHeaderTags = (options?: Options): any => {
  const { title, description, keywords } = options || {};
  const defaultTitle = 'Next.js Static Blog';
  const finalDescription = description || 'A static blog';

  return (
    <>
      {title
        ? (<title>{title} | {defaultTitle}</title>)
        : (<title>{defaultTitle}</title>)
      }

      <meta name='description' content={finalDescription} />

      {keywords && (
        <meta name='keywords' content={keywords.join(',')} />
      )}
    </>
  );
};

export default useStandardHeaderTags;
