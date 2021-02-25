import path from 'path'
import shell from 'shelljs'
import { createExcerpt, parseMarkdownFile } from '@docusaurus/utils'

import siteConfig from '@/configs/site-config'
import { calcReadTime } from '@/utils/calcReadTime'

export const loadMDXFromPages = async (mdxDir = 'courses') => {
  const { processFrontmatter } = require('../mdxUtils')

  const dir = path.join(process.cwd(), `src/pages/${mdxDir}`)
  const filenames = shell.ls('-R', `${dir}/**/*.mdx`)

  const dataPromise = filenames.map(async filename => {
    // get the `pages` directory
    const pagesDir = path.join(process.cwd(), 'src/pages')

    // gets the relative mdx path
    // pages/courses/guides.mdx => /courses/guides.mdx
    const mdxPath = path.relative(pagesDir, filename)

    // extract frontmatter and content from markdown string
    const { frontMatter, content } = await parseMarkdownFile(filename)

    // extends frontmatter with more useful information
    return processFrontmatter({
      ...frontMatter,
      path: mdxPath,
      baseEditUrl: siteConfig.repo.editUrl,
      excerpt: frontMatter.excerpt || createExcerpt(content),
      readTimeMinutes: calcReadTime(content),
    })
  })

  const data = await Promise.all(dataPromise)

  return data
}

export default loadMDXFromPages
