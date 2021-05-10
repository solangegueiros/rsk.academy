import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { CONTENT_PATH } from '@utils/loadMdxInfo'

type GetMdxInfoReturtType = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: Record<string, unknown>
}

export const getMdxInfo = async (filePath: string, locale: string): Promise<GetMdxInfoReturtType> => {
  const mdxFilePath = path.join(CONTENT_PATH, `${filePath}/${locale}.mdx`)

  const mdxContent = fs.readFileSync(mdxFilePath)

  const { content, data } = matter(mdxContent)

  const source = await serialize(content)

  return { source, frontMatter: data }
}
