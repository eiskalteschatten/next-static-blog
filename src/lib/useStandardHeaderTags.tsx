import React from 'react';

const useStandardHeaderTags = (title?: string, description?: string): any => {
  const defaultTitle = 'Next.js Static Blog';
  description = description || 'A static blog';

  return (
    <>
      {title
        ? (<title>{title} | {defaultTitle}</title>)
        : (<title>{defaultTitle}</title>)
      }

      <meta name='description' content={description} />
    </>
  );
};

export default useStandardHeaderTags;
