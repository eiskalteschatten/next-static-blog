import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import siteSettings from '~/siteSettings';

class Document extends NextDocument {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='Content-Language' content='en' />
          <meta name='robots' content='index,follow' />
          <meta name='author' content={siteSettings.author} />
          <meta name='copyright' content={siteSettings.copyright} />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

          <link rel='icon' type='image/x-icon' href='/favicon.png' />

          <link rel='alternate' type='application/rss+xml' title='RSS Feed' href={`${siteSettings.siteUrl}/feed.xml`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
