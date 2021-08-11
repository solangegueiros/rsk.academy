import { ReactNode } from 'react'

import { Box, chakra, Flex, Grid } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'

import { Container, Header, Seo, Footer, Loader } from '@components'

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
      <Loader />
      <Seo title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container as='main' minH='calc(100vh - 4.5rem)'>
        <Grid gridTemplateColumns={{ sm: '1fr', md: '350px 1fr' }} gap={12} w='full'>
          {sidebar || null}
          <Box overflow='hidden'>
            <SkipNavContent />
            <Flex direction='column' h='full'>
              <Box flex={1}>
                <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1' mb={8}>
                  {title}
                </chakra.h1>

                <Box h='full'>{children}</Box>
              </Box>
              {editUrl && (
                <Box mt='40px'>
                  <EditPageButton href={editUrl} />
                </Box>
              )}
              {pagination || null}
            </Flex>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default PageContainer
