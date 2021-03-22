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
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo } from '@/components/all'
import { useGradient } from '@/hooks/useGradient'

const Home = () => {
  const gradient1 = useGradient('to-r')
  const gradient2 = useGradient('to-l')

  const { t } = useI18n()

  return (
    <Layout isStretched>
      <Seo title={t('home')} description='Rsk Academy' />
      <SimpleGrid
        bgGradient={useColorModeValue(
          'linear(to-r,primary.500,light.600)',
          'linear(to-t,light.900,dark.600)',
        )}
        mt={-8}
        columns={{ base: 1, md: 2 }}
        h='calc(100vh - 70px)'
      >
        <Center color='white'>
          <Container flex='1'>
            <Box px={{ base: 2, md: 8 }} py={8} h='full'>
              <Heading mb={4} color='white'>
                {t('homePage.slogan')}
              </Heading>
              <Text fontSize='1.4em' maxW='container.md'>
                {t('homePage.slogan2')}
              </Text>
            </Box>
          </Container>
        </Center>
        <Center p={8}>
          <Image w='full' objectFit='cover' src='/img/home.png' />
        </Center>
      </SimpleGrid>

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
              <Heading color='inherit'>{t('homePage.developerTitle')}</Heading>
              <Text fontSize='1.4em'>{t('homePage.developerDescription')}</Text>
            </VStack>
            <Box d={{ base: 'none', lg: 'block' }} maxW={400}>
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
              <Heading color='inherit'>{t('homePage.businessTitle')}</Heading>
              <Text fontSize='1.4em'>{t('homePage.businessDescription')}</Text>
            </VStack>
          </Flex>
        </Container>
      </Center>

      <Container py={32} mb={16}>
        <VStack textAlign='center' spacing={4}>
          <Heading mb={8}>{t('homePage.partnerships')}</Heading>
          <Text fontSize='1.4em'>{t('homePage.whiteLabel')}</Text>
          <Text fontSize='1.4em'>{t('homePage.trainingMentors')}</Text>
        </VStack>
      </Container>
    </Layout>
  )
}

/*
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

  */

export default Home
