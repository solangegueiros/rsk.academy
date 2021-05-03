import path from 'path'
import shell from 'shelljs'
import matter from 'gray-matter'

import siteConfig from '@configs/site-config'

type ExtendedFrontMatterType = {
  title: string
  description: string
  slug: string
  editUrl: string
  tags?: string
  excerpt?: string
  content?: string
}

export const CONTENT_FOLDER_NAME = 'content'
export const CONTENT_PATH = path.join(process.cwd(), CONTENT_FOLDER_NAME)

export const loadMDXInfo = (mdxDir: string, locale = '*'): ExtendedFrontMatterType[] => {
  const root = process.cwd()
  const filenames = shell.ls('-R', `${mdxDir}/**/${locale}.mdx`)

  return filenames.map((filename: string) => {
    const mdxPath = path.relative(root, filename).replace(`${CONTENT_FOLDER_NAME}/`, '')
    const baseEditUrl = siteConfig.repo.editUrl
    const editUrl = path.join(baseEditUrl, CONTENT_FOLDER_NAME, mdxPath)
    const slug = mdxPath.replace('.mdx', '')

    const { excerpt, content, data } = matter(filename)

    return {
      title: data.title,
      description: data.description,
      slug,
      editUrl,
      tags: data.tags,
      excerpt: excerpt || data.excerpt,
      content,
    }
  })
}
