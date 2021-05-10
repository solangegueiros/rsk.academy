import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Spinner } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PageContainer, Pagination, Sidebar } from '@components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getRoutes } from '@utils/getRoutes'
import { findRouteByPath } from '@utils/findRouteByPath'
import { getRouteContext } from '@utils/getRouteContext'
import { MDXProvider } from '@mdx-js/react'
import { Markdown } from '@components/Markdown'
import { getMdxPaths } from '@lib/getMdxPaths'
import { getMdxInfo } from '@lib/getMdxInfo'

interface MdxPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: any
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
