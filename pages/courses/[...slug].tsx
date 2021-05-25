import { Spinner } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { FrontMatterType, PageContainer, Pagination, Sidebar } from '@components'
import { Markdown } from '@components/Markdown'
import { getMdxPaths, getMdxInfo } from '@lib/mdx'
import { findRouteByPath } from '@utils/findRouteByPath'
import { getRouteContext } from '@utils/getRouteContext'
import { getRoutes } from '@utils/getRoutes'

interface MdxPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: FrontMatterType
  course: string
  filePath: string
}

const MdxPage = ({ source, frontMatter, course, filePath }: MdxPageProps): JSX.Element => {
  const routes = getRoutes(course || 'dev')
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
  const paths = await getMdxPaths()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params.slug as string[]
  const filePath = slug.join('/')
  const { source, frontMatter } = await getMdxInfo(filePath, locale)

  const ssrTranslations = await serverSideTranslations(locale, ['common'])

  return {
    props: {
      source,
      frontMatter,
      course: params.slug[0],
      filePath: `/courses/${filePath}`,
      ...ssrTranslations,
    },
  }
}

export default MdxPage
