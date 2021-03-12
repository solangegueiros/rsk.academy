import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Avatar, Box, chakra, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

import {
  Container,
  Header,
  Seo,
  PageTransition,
  Footer,
} from '@/components/all'
import { Transactions } from '../Transactions'
import { EditPageButton } from './EditPageButton'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()
  const { locale, route } = router

  useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)

    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [])

  useEffect(() => {
    router.push(route.slice(0, -2) + locale)
  }, [locale])
}

export const PageContainer = props => {
  const { frontmatter, children, sidebar, pagination } = props
  useHeadingFocusOnRouteChange()

  const { title, description, editUrl, author } = frontmatter

  return (
    <>
      <Seo title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container d='flex' as='main' maxW='full' minH='calc(100vh - 4.5rem)'>
        <Flex flex='1'>
          {sidebar || null}
          <Box flex='1' w='full'>
            <SkipNavContent />
            <Flex
              h='full'
              flexDir='column'
              id='content'
              px={5}
              mx='auto'
              maxW='64rem'
            >
              <PageTransition>
                <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1' mb={8}>
                  {title}
                </chakra.h1>
                {author && (
                  <HStack>
                    <Avatar size='sm' src={author.avatarUrl} />
                    <HStack align='stat'>
                      <Text>{author.name}</Text>
                      <chakra.a href={author.githubUrl}>
                        <Icon as={FaGithub} />
                      </chakra.a>
                    </HStack>
                  </HStack>
                )}

                <Box h='full'>{children}</Box>
              </PageTransition>
              <Box mt='40px'>
                {editUrl && <EditPageButton href={editUrl} />}
              </Box>
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

export const frontMatterType = {
  title: PropTypes.string,
  description: PropTypes.string,
  editUrl: PropTypes.string,
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    githubUrl: PropTypes.string,
  }),
}

PageContainer.propTypes = {
  frontmatter: PropTypes.shape(frontMatterType).isRequired,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
  pagination: PropTypes.node,
}

export default PageContainer
