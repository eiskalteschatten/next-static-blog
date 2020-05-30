import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import useStandardHeaderTags from '~/lib/useStandardHeaderTags';

interface Props {
  statusCode: number;
}

const ErrorPage: React.FC<Props> = ({ statusCode }) => {
  const title = statusCode === 404 ? '404' : 'Error';

  return (
    <>
      <Head>
        {useStandardHeaderTags({ title })}
      </Head>
      {statusCode === 404
        ? 'The page you are looking for could not be found.'
        : 'An error occurred.'}
    </>
  );
};

(ErrorPage as any).getInitialProps = ({ res, req, err }): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);

      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash
        });
        res.end();
      }
      else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode };
};

export default ErrorPage;
