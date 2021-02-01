import { useEffect } from 'react'
import { Avatar, Box, chakra, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

import {
  Container,
  EditPageButton,
  Header,
  Seo,
  PageTransition,
} from '@/components/index'

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
      <Container as='main' maxW='full'>
        <Flex>
          {sidebar || null}
          <Box flex='1' w='full'>
            <SkipNavContent />
            <Box id='content' px={5} mx='auto' maxW='64rem' minH='76vh'>
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

                {children}
              </PageTransition>
              <Box mt='40px'>
                {editUrl && <EditPageButton href={editUrl} />}
              </Box>
              {pagination || null}
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default PageContainer
