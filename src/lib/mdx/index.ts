import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { ls } from 'shelljs'

import { slash } from '@utils/slash'

const CONTENT_FOLDER = 'content'

export const getMdxPaths = async (): Promise<{ params: { slug: string[] }; locale: string }[]> => {
  const dir = slash(path.join(process.cwd(), CONTENT_FOLDER))
  const mdxPages: string[] = ls('-R', `${dir}/**/*.mdx`)

  return mdxPages.map((filePath: string) => {
    const slugArr = slash(filePath).replace('.mdx', '').replace(dir, '').split('/').filter(Boolean)

    const [course, module, url, lang] = slugArr

    return {
      params: {
        slug: [course, module, url],
      },
      locale: lang,
    }
  })
}

type GetMdxInfoReturnType = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Record<string, unknown>
}

export const getMdxInfo = async (filePath: string, locale: string): Promise<GetMdxInfoReturnType> => {
  const root = process.cwd()
  const mdxFilePath = path.join(root, CONTENT_FOLDER, `${filePath}/${locale}.mdx`)
  const mdxContent = fs.readFileSync(mdxFilePath)

  const { content, data } = matter(mdxContent)

  const source = await serialize(content)

  return { source, frontMatter: data }
}
