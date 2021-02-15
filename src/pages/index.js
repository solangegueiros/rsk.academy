import {
  Box,
  Flex,
  Center,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo } from '@/components/index'
import { useGradient } from '@/hooks/use-gradient'
import { FaConnectdevelop } from 'react-icons/fa'

const Home = () => {
  const gradient1 = useGradient('to-r')
  const gradient2 = useGradient('to-l')

  const { t } = useI18n()
  return (
    <Layout fluid>
      <Seo title={t('home')} description='Rsk Academy' />
      <Center
        bg={useColorModeValue('primary.500', 'light.500')}
        color={useColorModeValue('white', 'dark.500')}
        h='calc(100vh - 70px)'
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
            <Text fontSize='1.4em' maxW='container.md'>
              Educating the new generations about Bitcoin, blockchain and open
              source technologies are the best way to empower them with the
              tools to build a better world.
            </Text>
          </Flex>
        </Container>
      </Center>

      <Center bgGradient={gradient1}>
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
              <Text fontSize='1.4em'>
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

      <Center bgGradient={gradient2}>
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
              <Text fontSize='1.4em'>
                Non-technical professionals willing to work on the blockchain
                industry and/or use blockchain applications.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Center>

      <Container>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={16} py={24}>
          <VStack textAlign='center' spacing={4}>
            <Icon
              color={useColorModeValue('primary.500', 'light.500')}
              as={FaConnectdevelop}
              boxSize={24}
            />
            <Text fontSize='1.4em'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </VStack>
          <VStack textAlign='center' spacing={4}>
            <Icon
              color={useColorModeValue('primary.500', 'light.500')}
              as={FaConnectdevelop}
              boxSize={24}
            />
            <Text fontSize='1.4em'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </VStack>
          <VStack textAlign='center' spacing={4}>
            <Icon
              color={useColorModeValue('primary.500', 'light.500')}
              as={FaConnectdevelop}
              boxSize={24}
            />
            <Text fontSize='1.4em'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
          </VStack>
        </SimpleGrid>
      </Container>

      <Container py={32} mb={16}>
        <VStack textAlign='center' spacing={4}>
          <Heading mb={8}>Partnerships - white label courses</Heading>
          <Text fontSize='1.4em'>
            White label: The partner can use its own trademark in the courses
            while IOV provides the content and examination tools.
          </Text>
          <Text fontSize='1.4em'>
            Training mentors: IOV offers training for in-house mentors who can
            help students during the courses.
          </Text>
        </VStack>
      </Container>
    </Layout>
  )
}

export default Home
