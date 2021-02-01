const path = require('path')
const fromUnixTime = require('date-fns/fromUnixTime')
const format = require('date-fns/format')
const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils')
const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN })

function fileToPath(str) {
  return addLeadingSlash(str.replace('.mdx', ''))
}

async function processFrontmatter(options) {
  const { path: mdxPath, author, tags, baseEditUrl, ...rest } = options

  const editUrl = getEditUrl(path.join(mdxPath), baseEditUrl)

  // get the slug
  const slug = fileToPath(mdxPath)

  // if frontmatter inclues author, add the author's data
  const authorData = author ? await getGithubUserData(author) : undefined

  return {
    ...rest,
    slug,
    editUrl,
    author: authorData,
    tags,
  }
}

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str) {
  if (!str) return null

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/
  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX)

  if (!temp || temp.length < 3) return null

  // eslint-disable-next-line no-unused-vars
  const [_, timestamp, author] = temp
  const dateStr = fromUnixTime(+timestamp)

  return {
    date: format(dateStr, 'MMMM dd, yyyy'),
    author,
  }
}

async function getGithubUserData(username) {
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
}

module.exports = {
  getTimestampAndAuthor,
  fileToPath,
  processFrontmatter,
  getGithubUserData,
}
