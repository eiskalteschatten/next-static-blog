import React from 'react';

const useStandardHeaderTags = (title?: string): any => {
  const defaultTitle = 'Next.js Static Blog';

  return (
    <>
      {title
        ? (<title>{title} | {defaultTitle}</title>)
        : (<title>{defaultTitle}</title>)
      }
    </>
  );
};

export default useStandardHeaderTags;
