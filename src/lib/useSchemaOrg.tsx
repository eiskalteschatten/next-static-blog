import React from 'react';
import { useRouter } from 'next/router';

import {
  Person,
  WebSite,
  WebPage,
  CollectionPage,
  ProfilePage
} from 'schema-dts';

import siteSettings from '~/siteSettings';

interface Options {
  webpage?: {
    pageTitle: string;
    pageDescription?: string;
  };

  collectionPage?: boolean;

  profilePage?: {
    name: string;
  };
}

const useSchemaOrg = (options?: Options): any => {
  const router = useRouter();
  const { pageTitle, pageDescription } = options?.webpage || {};

  const name = options?.webpage ? `${pageTitle} - ${siteSettings.siteTitle}` : siteSettings.siteTitle;
  const url = `${siteSettings.siteUrl}${router.asPath}`;

  const person: Person = {
    '@type': 'Person',
    '@id': `${siteSettings.siteUrl}/#/person`,
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
    '@id': `${siteSettings.siteUrl}/#website`,
    url: siteSettings.siteUrl,
    name: siteSettings.siteTitle,
    description: siteSettings.siteDescription,
    publisher: {
      '@id': `${siteSettings.siteUrl}/#/person`
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
    '@id': `${url}/#webpage`,
    url,
    name,
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
          url
        ]
      }
    ]
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [person, website, webpage] as any
  };


  if (options?.collectionPage) {
    const collectionPage: CollectionPage = {
      '@type': 'CollectionPage',
      '@id':  `${url}/#webpage`,
      url,
      name,
      isPartOf: {
        '@id':  `${siteSettings.siteUrl}/#website`
      },
      inLanguage: siteSettings.siteLanguage
    };

    schema['@graph'].push(collectionPage);
  }

  if (options?.profilePage) {
    const profilePage: ProfilePage = {
      '@type': 'ProfilePage',
      '@id':  `${url}/#webpage`,
      url,
      name: `${options.profilePage.name}`,
      isPartOf: {
        '@id':  `${siteSettings.siteUrl}/#website`
      },
      inLanguage: siteSettings.siteLanguage
    };

    schema['@graph'].push(profilePage);
  }

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
