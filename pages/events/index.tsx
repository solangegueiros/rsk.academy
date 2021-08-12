// import { useEffect, useState } from 'react'

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
  Box,
} from '@chakra-ui/react'
import { isFuture, isPast } from 'date-fns'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
// import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'

import { Seo, Layout } from '@components'
import { getEvents, EventType } from '@lib/getEvents'

const TimeZone = dynamic(() => import('../../src/components/TimeZone'), {
  ssr: false,
})

export enum LANGUAGES {
  en = 'English',
  es = 'Español',
  pt = 'Português',
}

interface EventsProps {
  events: EventType[]
}

const Events = ({ events }: EventsProps): JSX.Element => {
  const { t } = useTranslation('common')
  const bg = useColorModeValue('white', 'dark.400')
  // const [eventState, setEventState] = useState<EventType[]>(events)
  // const { locale } = useRouter()

  const pastEvents = events.filter(({ datetime }) => isPast(new Date(datetime)))
  const nextEvents = events.filter(({ datetime }) => isFuture(new Date(datetime)))

  // useEffect(() => {
  //   ;(async function fetchEvents() {
  //     const response = await fetch('/api/events')
  //     const result = await response.json()
  //     const _events = result.filter((event: EventType) => event.language === locale)
  //     setEventState(_events)
  //   })()
  // }, [])

  return (
    <Layout>
      <Seo title={t`events`} description={t`events`} />
      {nextEvents?.length > 0 && (
        <Box mb={8}>
          <Heading mb={4}>{t`nextEvents`}</Heading>
          <VStack spacing={8} align='start' w='full'>
            {nextEvents.map(({ id, title, datetime, language, speaker, role, twitter, image }) => (
              <NextLink href={`/events/${id.split('-')[0]}`} key={id}>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  _hover={{ boxShadow: 'lg' }}
                  boxShadow='md'
                  bg={bg}
                  cursor='pointer'
                  w='full'
                >
                  <Center pl={2} w={{ base: 'full', md: '25%' }}>
                    <Image src={image} alt={title} />
                  </Center>
                  <VStack w={{ base: 'full', md: '75%' }} justify='space-between' align='stretch'>
                    <VStack spacing={2} align='start' p={4}>
                      <Heading textTransform='capitalize' size='lg' as='h2' mb={4}>
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
            ))}
          </VStack>
        </Box>
      )}
      {pastEvents?.length > 0 && (
        <Box mb={8}>
          <Heading mb={4}>{t`pastEvents`}</Heading>
          <VStack spacing={4} align='start' w='full'>
            {pastEvents.map(({ id, title, datetime, language, image }) => (
              <NextLink href={`/events/${id.split('-')[0]}`} key={id}>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  _hover={{ boxShadow: 'lg' }}
                  boxShadow='md'
                  bg={bg}
                  cursor='pointer'
                  w='full'
                >
                  <Center pl={2} w={{ base: 'full', md: '25%' }}>
                    <Image src={image} alt={title} />
                  </Center>
                  <VStack w={{ base: 'full', md: '75%' }} justify='space-between' align='stretch'>
                    <VStack spacing={2} align='start' p={4}>
                      <Heading textTransform='capitalize' size='lg' as='h2' mb={4}>
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
        </Box>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await getEvents()
  const events = response.filter(event => event.language === locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      events,
    },
  }
}

export default Events
