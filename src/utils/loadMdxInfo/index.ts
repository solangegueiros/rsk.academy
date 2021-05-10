import fs from 'fs'
import path from 'path'
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

async function* getFiles(dir: string) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

export const CONTENT_FOLDER_NAME = 'content'
export const CONTENT_PATH = path.join(process.cwd(), CONTENT_FOLDER_NAME)

export const loadMDXInfo = async (mdxDir: string, locale = '*'): Promise<ExtendedFrontMatterType[]> => {
  const root = process.cwd()
  const result = await getFiles(path.join(root, CONTENT_FOLDER_NAME))
  const filenames = []

  for await (const filePath of result) {
    if (filePath.includes(`${locale}.mdx`)) filenames.push(filePath)
  }

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
