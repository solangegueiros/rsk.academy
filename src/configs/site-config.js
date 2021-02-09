const baseUrl = 'https://github.com/solangegueiros/rsk.academy'

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} IOV Labs. All Rights Reserved.`,
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/develop/website`,
    blobUrl: `${baseUrl}/blob/develop`,
  },
  slack: {
    url:
      'https://join.slack.com/t/open-rsk-dev/shared_invite/zt-kk3yfuc6-qn~DrpMLvADkAUu1pbAcZA',
  },
  seo: {
    title: 'RSK Academy',
    titleTemplate: '%s - RSK Academy',
    description: 'RSK Academy Description',
    siteUrl: 'https://academy.rsk.co',
    twitter: {
      handle: '@rsk-academy',
      site: '@rsk-academy',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://academy.rsk.co',
      title: 'RSK Academy',
      description: 'RSK Academy Description',
      siteName: 'RSK Academy',
      images: [
        {
          url: '/og-image.png',
          width: 1240,
          height: 480,
          alt: 'RSK Academy Description',
        },
        {
          url: '/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'RSK Academy Description',
        },
      ],
    },
  },
}

export default siteConfig
