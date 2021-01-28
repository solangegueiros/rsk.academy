/* eslint-disable import/extensions */
import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'

import devSidebar from '@/configs/dev-sidebar.json'
import businessSidebar from '@/configs/business-sidebar.json'
import blogSidebar from '@/configs/blog-sidebar.json'

import { findRouteByPath, removeFromLast } from '@/utils/find-route-by-path'
import { getRouteContext } from '@/utils/get-route-context'

import {
  MdxComponents,
  PageContainer,
  Pagination,
  Sidebar,
} from '@/components/index'
import { useRouter } from 'next/router'

export function getRoutes(slug) {
  const configMap = {
    '/blog': blogSidebar,
    '/courses/dev': devSidebar,
    '/courses/business': businessSidebar,
  }

  // eslint-disable-next-line no-unused-vars
  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path),
    ) ?? []

  return sidebar?.routes ?? []
}

function MDXLayout({ frontmatter, children }) {
  const routes = getRoutes(frontmatter.slug)
  const { locale } = useRouter()

  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes, locale)

  return (
    <MDXProvider components={{ ...chakraComponents, ...MdxComponents }}>
      <PageContainer
        frontmatter={frontmatter}
        sidebar={<Sidebar routes={routes} />}
        pagination={
          <Pagination
            next={routeContext.nextRoute}
            previous={routeContext.prevRoute}
          />
        }
      >
        {children}
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
