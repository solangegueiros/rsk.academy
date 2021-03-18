const path = require('path')
const { getEditUrl, addLeadingSlash } = require('@docusaurus/utils')

function fileToPath(str) {
  return addLeadingSlash(str.replace('.mdx', ''))
}

function processFrontmatter(options) {
  const { path: mdxPath, tags, baseEditUrl, ...rest } = options

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

module.exports = {
  fileToPath,
  processFrontmatter,
}
