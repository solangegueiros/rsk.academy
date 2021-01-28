const withPlugins = require('next-compose-plugins')
const withMdx = require('next-mdx-enhanced')

const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils')
const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN })

async function getUserData(username) {
  try {
    const { data } = await octokit.users.getByUsername({ username })

    const {
      avatar_url: avatarUrl,
      html_url: githubUrl,
      blog: websiteUrl,
      bio,
      name,
      twitter_username: twitterUsername,
    } = data

    return {
      login: username,
      avatarUrl,
      githubUrl,
      websiteUrl,
      bio,
      name,
      twitterUsername,
    }
  } catch {
    // given a user no longer exists, octokit will error
    return null
  }
}

const EDIT_URL =
  'https://github.com/solangegueiros/rsk.academy/edit/develop/website/pages'

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
    process: async (_, frontmatter) => {
      const { __resourcePath: mdxPath, author, tags } = frontmatter

      // get the edit url
      const editUrl = getEditUrl(mdxPath, EDIT_URL)

      // get the slug
      const slug = fileToPath(mdxPath)

      // if frontmatter inclues author, add the author's data
      const authorData = author ? await getUserData(author) : undefined

      return {
        slug,
        editUrl,
        author: authorData,
        tags,
      }
    },
  },
}

module.exports = withPlugins([withMdx(mdxConfig)], defaultConfig)
