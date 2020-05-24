import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='Content-Language' content='en' />
          <meta name='robots' content='index,follow' />
          <meta name='author' content='Alex Seifert' />
          <meta name='copyright' content='Copyright (c) Alex Seifert' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

          <link rel='icon' type='image/x-icon' href='/favicon.png' />

          <link rel='alternate' type='application/rss+xml' title='RSS Feed' href='https://blog.alexseifert.com/feed/' />
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
