import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import shell from 'shelljs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { slash } from '@utils/slash'

const CONTENT_FOLDER = 'content'

export const getMdxPaths = async (): Promise<{ params: { slug: string[] }; locale: string }[]> => {
  const dir = slash(path.join(process.cwd(), CONTENT_FOLDER))
  const mdxPages = shell.ls('-R', `${dir}/**/*.mdx`)

  return mdxPages.map(filePath => {
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

type GetMdxInfoReturtType = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Record<string, unknown>
}

export const getMdxInfo = async (filePath: string, locale: string): Promise<GetMdxInfoReturtType> => {
  const root = process.cwd()
  const mdxFilePath = path.join(root, CONTENT_FOLDER, `${filePath}/${locale}.mdx`)
  const mdxContent = fs.readFileSync(mdxFilePath)

  const { content, data } = matter(mdxContent)

  const source = await serialize(content)

  return { source, frontMatter: data }
}
