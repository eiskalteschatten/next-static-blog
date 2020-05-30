import React from 'react';
import { useRouter } from 'next/router';

import {
  Person,
  WebSite,
  WebPage
} from 'schema-dts';

import siteSettings from '~/siteSettings';

interface Options {
  webpage?: {
    pageTitle?: string;
    pageDescription?: string;
  };
}

const useSchemaOrg = (options?: Options): any => {
  const router = useRouter();

  const {
    webpage: { pageTitle, pageDescription }
  } = options || {};

  const person: Person = {
    '@type': 'Person',
    '@id': `${siteSettings.siteUrl}/#/schema/person`,
    name: 'Alex Seifert',
    image: {
      '@type': 'ImageObject',
      '@id': `${siteSettings.siteUrl}/#personlogo`,
      inLanguage: siteSettings.siteLanguage,
      url: siteSettings.siteUrl,
      caption: 'Alex Seifert'
    },
    description: ''
  };

  const website: WebSite = {
    '@type': 'WebSite',
    '@id': '/#website',
    url: siteSettings.siteUrl,
    name: siteSettings.siteTitle,
    description: siteSettings.siteDescription,
    publisher: {
      '@id': `${siteSettings.siteUrl}/#/schema/person`
    },
    // potentialAction: [
    //   {
    //     '@type': 'SearchAction',
    //     target: `${siteSettings.siteUrl}/?s={search_term_string}`,
    //     'query-input': 'required name=search_term_string'
    //   }
    // ],
    inLanguage: siteSettings.siteLanguage
  };

  const webpage: WebPage = {
    '@type': 'WebPage',
    '@id': `${siteSettings.siteUrl}${router.asPath}/#webpage`,
    url: `${siteSettings.siteUrl}${router.asPath}`,
    name: pageTitle ? `${pageTitle} - ${siteSettings.siteTitle}` : siteSettings.siteTitle,
    isPartOf: {
      '@id': `${siteSettings.siteUrl}/#website`
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    inLanguage: siteSettings.siteLanguage,
    description: pageDescription ? pageDescription : siteSettings.siteDescription,
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [
          `${siteSettings.siteUrl}${router.asPath}`
        ]
      }
    ]
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [person, website, webpage]
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null,2)
      }}
    />
  );
};

export default useSchemaOrg;
