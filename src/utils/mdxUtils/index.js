const path = require('path')
const fromUnixTime = require('date-fns/fromUnixTime')
const format = require('date-fns/format')
const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils')

function fileToPath(str) {
  return addLeadingSlash(str.replace('.mdx', ''))
}

function processFrontmatter(options) {
  const { path: mdxPath, author, tags, baseEditUrl, ...rest } = options

  const editUrl = getEditUrl(path.join(mdxPath), baseEditUrl)

  // get the slug
  const slug = fileToPath(mdxPath)

  return {
    ...rest,
    slug,
    editUrl,
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

module.exports = {
  getTimestampAndAuthor,
  fileToPath,
  processFrontmatter,
}
