import React from 'react';
import Head from 'next/head';

import useSeoTags from '~/lib/useSeoTags';

const ErrorPage404: React.FC = () => {

  return (
    <>
      <Head>
        {useSeoTags({ title: '404' })}
      </Head>

      The page you are looking for could not be found.
    </>
  );
};

export default ErrorPage404;
