import { ReactNode } from 'react'
import { Box, chakra, Flex } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'

import { Container, Header, Seo, PageTransition, Footer } from '@components'
import { Transactions } from '../Transactions'
import { EditPageButton } from './EditPageButton'

export interface FrontMatterType {
  title: string
  description: string
  editUrl: string
  slug?: string
}

export interface PageContainerProps {
  frontmatter: FrontMatterType
  children: ReactNode
  sidebar?: ReactNode
  pagination?: ReactNode
}

export const PageContainer = (props: PageContainerProps): JSX.Element => {
  const { frontmatter, children, sidebar, pagination } = props

  const { title, description, editUrl } = frontmatter

  return (
    <>
      <Seo title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container d='flex' as='main' minH='calc(100vh - 4.5rem)'>
        <Flex flex='1'>
          {sidebar || null}
          <Box flex='1' w='full'>
            <SkipNavContent />
            <Flex h='full' flexDir='column' id='content' maxW='72rem'>
              <PageTransition>
                <Box flex='1' h='full' d='flex' flexDir='column'>
                  <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1' mb={8}>
                    {title}
                  </chakra.h1>

                  <Box h='full'>{children}</Box>
                </Box>
              </PageTransition>
              <Box mt='40px'>{editUrl && <EditPageButton href={editUrl} />}</Box>
              {pagination || null}
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Footer />
      <Transactions />
    </>
  )
}

export default PageContainer