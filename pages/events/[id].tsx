/* eslint-disable camelcase */
// import { useEffect, useState } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  Link,
  Button,
  VStack,
  Spinner,
  Flex,
  SimpleGrid,
  useColorModeValue,
  AspectRatio,
  Stack,
} from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
// import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'
import { IoLanguage } from 'react-icons/io5'
import { RiVideoChatFill, RiMapPin2Line } from 'react-icons/ri'

import { Layout, Seo } from '@components'
import { getEvent, getEventPaths, EventType } from '@lib/getEvents'

const TimeZone = dynamic(() => import('../../src/components/TimeZone'), {
  ssr: false,
})

function extractVideoIdFromUrl(url: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

const LANGUAGES = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

const Event = ({ event }: { event: EventType }): JSX.Element => {
  const { t } = useTranslation('common')
  const bg = useColorModeValue('white', 'dark.400')
  // const [eventState, setEventState] = useState<EventType>(event)
  // const { query } = useRouter()

  // useEffect(() => {
  //   ;(async function fetchEvent() {
  //     const response = await fetch(`/api/events?id${query.id}`)
  //     const result = await response.json()
  //     const _event = result.find((event: EventType) => event.id === query.id)
  //     setEventState(_event)
  //   })()
  // }, [])

  if (!event)
    return (
      <Flex h='100vh' align='center' justify='center'>
        <Spinner size='lg' />
      </Flex>
    )

  const {
    datetime,
    title,
    language,
    speaker,
    role,
    twitter,
    city,
    description,
    webinar_link,
    rsvp_embed,
    image,
    video_link,
    resources,
  } = event

  const isExpired = isPast(new Date(datetime))
  const videoId = extractVideoIdFromUrl(video_link)

  return (
    <Layout>
      <Seo title={title} description={title} />
      <Heading textTransform='capitalize' my={8} as='h1'>
        {title}
      </Heading>
      <Stack bg={bg} p={8} spacing={8} direction={{ base: 'column', md: 'row' }} mb={8}>
        <Box w={{ base: 'full', md: '50%' }} mx='auto' bg={bg}>
          <Image w='full' src={image} />
        </Box>
        <VStack align='start' justify='center' w={{ base: 'full', md: '50%' }}>
          <Text fontSize='1.2em'>{description}</Text>
        </VStack>
      </Stack>
      <SimpleGrid p={8} bg={bg} alignItems='center' columns={{ base: 1, md: 2 }} gap={8} mb={8}>
        <VStack spacing={4} align='flex-start' fontSize='1.2em'>
          <TimeZone timeStr={datetime} spacing={4} />
          <HStack>
            <Icon as={IoLanguage} />
            <Text>{LANGUAGES[language]}</Text>
          </HStack>
          <HStack>
            <Icon as={RiMapPin2Line} />
            <Text>{city}</Text>
          </HStack>
          <HStack as={Link} rel='noopener noreferrer' target='_blank' href={`https://twitter.com/${twitter}`}>
            <Icon as={FaTwitter} />
            <Text>
              {speaker} | {role}
            </Text>
          </HStack>
        </VStack>
        <VStack align={{ base: 'center', md: 'flex-end' }} spacing={4}>
          {!isExpired && (
            <Button
              size='lg'
              target='_blank'
              rel='noopener noreferrer'
              as='a'
              leftIcon={<RiVideoChatFill />}
              href={webinar_link}
              isDisabled={!webinar_link}
            >
              Go to webinar
            </Button>
          )}

          <Button
            size='lg'
            target='_blank'
            rel='noopener noreferrer'
            as='a'
            leftIcon={<GoRepo />}
            href={resources}
            isDisabled={!resources}
          >
            Resources
          </Button>
        </VStack>
      </SimpleGrid>
      {!video_link && (
        <Box p={8} mt={8} boxShadow='md' bg={bg}>
          <Heading textAlign='center' as='h3' size='md' mb={8}>
            {t`register`}
          </Heading>
          <Box w='full' minH='450px' as='iframe' src={rsvp_embed} />
        </Box>
      )}
      {video_link && (
        <AspectRatio ratio={16 / 9}>
          <Box
            title={title}
            allowFullScreen={true}
            as='iframe'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media;'
            src={`https://youtube.com/embed/${videoId}`}
          />
        </AspectRatio>
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getEventPaths()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params: { id } }) => {
  const event = await getEvent(id)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      event,
    },
    revalidate: 5,
  }
}

export default Event
