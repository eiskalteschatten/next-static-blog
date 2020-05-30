import React from 'react';
import { useRouter } from 'next/router';

import {
  Person,
  WebSite,
  WebPage,
  CollectionPage,
  ProfilePage,
  Article,
  ImageObject
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

  article?: {
    titleImage?: string;
    headline: string;
    datePublished: string;
    dateModified: string;
    keywords: string;
    articleSection: string;
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
      '@id': `${url}/#webpage`,
      url,
      name,
      isPartOf: {
        '@id': `${siteSettings.siteUrl}/#website`
      },
      inLanguage: siteSettings.siteLanguage
    };

    schema['@graph'].push(collectionPage);
  }

  if (options?.profilePage) {
    const profilePage: ProfilePage = {
      '@type': 'ProfilePage',
      '@id': `${url}/#webpage`,
      url,
      name: `${options.profilePage.name}`,
      isPartOf: {
        '@id': `${siteSettings.siteUrl}/#website`
      },
      inLanguage: siteSettings.siteLanguage
    };

    schema['@graph'].push(profilePage);
  }

  if (options?.article) {
    if (options.article.titleImage) {
      const imageObject: ImageObject = {
        '@type': 'ImageObject',
        '@id': `${url}/#primaryimage`,
        url: `${siteSettings.siteUrl}${options.article.titleImage}`,
        inLanguage: siteSettings.siteLanguage
      };

      schema['@graph'].push(imageObject);
    }

    const { headline, datePublished, dateModified, keywords, articleSection } = options.article;

    const article: Article = {
      '@type': 'Article',
      '@id': `${url}/#article`,
      isPartOf: {
        '@id': `${url}/#webpage`
      },
      author: {
        '@id': `${siteSettings.siteUrl}/#/person`
      },
      headline,
      datePublished,
      dateModified,
      commentCount: 0,
      mainEntityOfPage: {
        '@id': `${url}/#webpage`
      },
      publisher: {
        '@id': `${siteSettings.siteUrl}/#/person`
      },
      image: {
        '@id': `${url}/#primaryimage`
      },
      keywords,
      articleSection,
      inLanguage: siteSettings.siteLanguage
    };

    schema['@graph'].push(article);
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export default useSchemaOrg;
