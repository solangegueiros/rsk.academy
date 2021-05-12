import fs from 'fs'
import nodePath from 'path'
import matter from 'gray-matter'
import { loadMDXInfo, CONTENT_PATH } from '@utils/loadMdxInfo'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Spinner } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PageContainer, Pagination, Sidebar } from '@components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getRoutes } from '@utils/getRoutes'
import { findRouteByPath } from '@utils/findRouteByPath'
import { getRouteContext } from '@utils/getRouteContext'
import { MDXProvider } from '@mdx-js/react'
import { Markdown } from '@components/Markdown'

interface MdxPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: any
  course: string
  filePath: string
}

const MdxPage = ({ source, frontMatter, course, filePath }: MdxPageProps): JSX.Element => {
  const routes = getRoutes(course)
  if (!frontMatter) return <Spinner />

  const route = findRouteByPath(filePath, routes, '#')
  const routeContext = getRouteContext(route, routes)

  return (
    <MDXProvider components={{ ...Markdown }}>
      <PageContainer
        frontmatter={frontMatter}
        sidebar={<Sidebar routes={routes} />}
        pagination={<Pagination next={routeContext.nextRoute} previous={routeContext.prevRoute} />}
      >
        <MDXRemote {...source} lazy />
      </PageContainer>
    </MDXProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mdxPages = loadMDXInfo(CONTENT_PATH)

  const paths = mdxPages.map(({ slug }) => {
    const slugArr = slug.split('/').filter(Boolean)

    const [course, module, url, lang] = slugArr

    return {
      params: {
        slug: [course, module, url],
      },
      locale: lang,
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params
  const filePath = typeof slug === 'string' ? slug : slug.join('/')

  const mdxFilePath = nodePath.join(CONTENT_PATH, `${filePath}/${locale}.mdx`)

  const source = fs.readFileSync(mdxFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content)

  const ssrTranslations = await serverSideTranslations(locale, ['common'])

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      course: slug[0],
      ...ssrTranslations,
      filePath: `/courses/${filePath}`,
    },
    revalidate: false,
  }
}

export default MdxPage
