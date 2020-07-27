import React from 'react';
import Head from 'next/head';

import useSeoTags from '~/lib/useSeoTags';

interface Props {
  statusCode: number;
}

const ErrorPage: React.FC<Props> = ({ statusCode }) => {
  return (
    <>
      <Head>
        {useSeoTags({ title: 'Error' })}
      </Head>

      An error ({statusCode}) occurred.
    </>
  );
};

(ErrorPage as any).getInitialProps = ({ res }): Props => ({
  statusCode: res.statusCode
});

export default ErrorPage;
