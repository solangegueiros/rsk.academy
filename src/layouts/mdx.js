/* eslint-disable import/extensions */
import PropTypes from 'prop-types'
import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import dynamic from 'next/dynamic'
import * as Spinners from 'react-spinners'

import {
  MdxComponents,
  PageContainer,
  Pagination,
  Sidebar,
  AcademyWallet,
  MasterName,
  MasterQuote,
  SubscribeAcademy,
  frontMatterType,
  WalletAddress,
  LowerCase,
} from '@/components/all'

import devSidebar from '@/configs/dev-sidebar.json'
import businessSidebar from '@/configs/business-sidebar.json'

import { findRouteByPath, removeFromLast } from '@/utils/findRouteByPath'
import { getRouteContext } from '@/utils/getRouteContext'

const QuizList = dynamic(() => import('../components/Quiz/QuizList'), {
  ssr: false,
})

export function getRoutes(slug) {
  const configMap = {
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
  const slug = frontmatter.slug.slice(0, -3)
  const routes = getRoutes(slug)

  const route = findRouteByPath(removeFromLast(slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <MDXProvider
      components={{
        ...chakraComponents,
        ...MdxComponents,
        ...Spinners,
        AcademyWallet,
        MasterName,
        MasterQuote,
        QuizList,
        SubscribeAcademy,
        WalletAddress,
        LowerCase,
      }}
    >
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

MDXLayout.propTypes = {
  frontmatter: PropTypes.shape(frontMatterType).isRequired,
  children: PropTypes.node.isRequired,
}

export default MDXLayout
