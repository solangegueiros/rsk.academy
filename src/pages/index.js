import {
  Box,
  Flex,
  Center,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo } from '@/components/index'
import { useGradient } from '@/hooks/use-gradient'

const Home = () => {
  const gradient1 = useGradient('to-r')
  const gradient2 = useGradient('to-l')

  const { t } = useI18n()
  return (
    <Layout fluid>
      <Seo title={t('home')} description='Rsk Academy' />
      <Center
        flex='1 0 0'
        bg={useColorModeValue('primary.500', 'light.500')}
        color={useColorModeValue('white', 'dark.500')}
      >
        <Container flex='1'>
          <Flex
            direction='column'
            px={{ base: 2, md: 8 }}
            py={8}
            justifyContent='center'
            h='full'
          >
            <Heading color={useColorModeValue('white', 'dark.500')} mb={4}>
              Because Knowledge is Freedom
            </Heading>
            <Text fontSize='1.2em'>
              Educationg the new generations about Bitcoin, blockchain and open
              source technologies are the best way to empower them with the
              tools to build a better world.
            </Text>
          </Flex>
        </Container>
      </Center>

      <Center flex='1 0 0' bgGradient={gradient1}>
        <Container>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            px={{ base: 2, md: 8 }}
            py={8}
            justifyContent='space-between'
            align='center'
          >
            <VStack mr={8} align='start' justify='center'>
              <Heading color='inherit'>Blockchain for developers</Heading>
              <Text fontSize='1.2em'>
                Developers with technical background willing to become general
                blockchain developers.
              </Text>
            </VStack>
            <Box maxW={400}>
              <Image maxH={400} src='/img/developers.svg' alt='developers' />
            </Box>
          </Flex>
        </Container>
      </Center>

      <Center flex='1 0 0' bgGradient={gradient2}>
        <Container>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            px={{ base: 2, md: 8 }}
            py={8}
            justifyContent='space-between'
            align='center'
          >
            <Box maxW={400}>
              <Image maxH={400} src='/img/business.svg' alt='business' />
            </Box>
            <VStack align='start' justify='center'>
              <Heading color='inherit'>Blockchain for business</Heading>
              <Text fontSize='1.2em'>
                Non-technical professionals willing to work on the blockchain
                industry and/or use blockchain applications.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Center>
    </Layout>
  )
}

export default Home
