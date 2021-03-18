const withPlugins = require('next-compose-plugins')
const withMdx = require('next-mdx-enhanced')

const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils')

const EDIT_URL =
  'https://github.com/solangegueiros/rsk.academy/edit/main/src/pages'

function fileToPath(str) {
  return addLeadingSlash(str.replace('.mdx', ''))
}

const defaultConfig = {
  target: 'serverless',
  webpack: config => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  i18n: {
    locales: ['en', 'es', 'pt'],
    defaultLocale: 'en',
  },
}

const mdxConfig = {
  layoutPath: 'src/layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-autolink-headings'),
    require('remark-emoji'),
    require('remark-images'),
    require('remark-slug'),
    require('remark-toc'),
    require('remark-unwrap-images'),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    process: (_, frontmatter) => {
      const { __resourcePath: mdxPath, tags } = frontmatter

      // get the edit url
      const editUrl = getEditUrl(mdxPath, EDIT_URL)

      // get the slug
      const slug = fileToPath(mdxPath)

      return {
        slug,
        editUrl,
        tags,
      }
    },
  },
}

module.exports = withPlugins([withMdx(mdxConfig)], defaultConfig)
