import PropTypes from 'prop-types'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import {
  Heading,
  Image,
  Text,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  VStack,
  Stack,
  Center,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import dynamic from 'next/dynamic'
import { IoLanguage } from 'react-icons/io5'
import { FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
import { isFuture, isPast } from 'date-fns'

import { getEvents } from '../../lib/api'

const TimeZone = dynamic(() => import('../../components/TimeZone'), {
  ssr: false,
})

const LANGUAGES = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

const Events = ({ events }) => {
  const { t } = useI18n()
  const bg = useColorModeValue('white', 'dark.400')

  const pastEvents = events.filter(({ datetime }) => isPast(new Date(datetime)))
  const nextEvents = events.filter(({ datetime }) =>
    isFuture(new Date(datetime)),
  )

  return (
    <Layout>
      <Seo title={t('events')} />
      {nextEvents?.length > 0 && (
        <>
          <Heading mb={4}>{t('nextEvents')}</Heading>
          <VStack spacing={8} align='start' w='full'>
            {nextEvents.map(
              ({
                id,
                title,
                datetime,
                language,
                speaker,
                role,
                twitter,
                image,
              }) => (
                <NextLink href={`/events/${id}`} key={id}>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    _hover={{ boxShadow: 'lg' }}
                    boxShadow='md'
                    bg={bg}
                    cursor='pointer'
                    w='full'
                  >
                    <Center pl={2} w={{ base: 'full', md: 1 / 4 }}>
                      <Image src={image} />
                    </Center>
                    <VStack
                      w={{ base: 'full', md: 3 / 4 }}
                      justify='space-between'
                      align='stretch'
                    >
                      <VStack spacing={2} align='start' p={4}>
                        <Heading
                          textTransform='capitalize'
                          size='lg'
                          as='h2'
                          mb={4}
                        >
                          {title}
                        </Heading>
                        <TimeZone timeStr={datetime} spacing={2} />
                        <HStack>
                          <Icon as={IoLanguage} />
                          <Text>{LANGUAGES[language]}</Text>
                        </HStack>
                        <HStack
                          as={Link}
                          rel='noopener noreferrer'
                          target='_blank'
                          href={`https://twitter.com/${twitter}`}
                        >
                          <Icon as={FaTwitter} />
                          <Text>
                            {speaker} | {role}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Stack>
                </NextLink>
              ),
            )}
          </VStack>
        </>
      )}
      {pastEvents?.length > 0 && (
        <>
          <Heading mb={4}>{t('pastEvents')}</Heading>
          <VStack spacing={4} align='start' w='full'>
            {pastEvents.map(({ id, title, datetime, language, image }) => (
              <NextLink href={`/events/${id}`} key={id}>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  _hover={{ boxShadow: 'lg' }}
                  boxShadow='md'
                  bg={bg}
                  cursor='pointer'
                  w='full'
                >
                  <Center pl={2} w={{ base: 'full', md: 1 / 4 }}>
                    <Image src={image} />
                  </Center>
                  <VStack
                    w={{ base: 'full', md: 3 / 4 }}
                    justify='space-between'
                    align='stretch'
                  >
                    <VStack spacing={2} align='start' p={4}>
                      <Heading
                        textTransform='capitalize'
                        size='lg'
                        as='h2'
                        mb={4}
                      >
                        {title}
                      </Heading>
                      <TimeZone timeStr={datetime} spacing={2} />
                      <HStack>
                        <Icon as={IoLanguage} />
                        <Text>{LANGUAGES[language]}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Stack>
              </NextLink>
            ))}
          </VStack>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const response = await getEvents()
  const events = response.filter(event => event.language === locale)

  return {
    props: {
      events,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
}

export default Events
