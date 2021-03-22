import PropTypes from 'prop-types'
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
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import { RiVideoChatFill, RiVideoFill, RiMapPin2Line } from 'react-icons/ri'
import { GoRepo } from 'react-icons/go'
import { useI18n } from 'next-localization'

import { Layout } from '@/components/all'
import Seo from '@/components/Seo'
import { getEvents } from '../../lib/api'

const TimeZone = dynamic(() => import('../../components/TimeZone'), {
  ssr: false,
})

const LANGUAGES = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

const Event = ({ event }) => {
  const { t } = useI18n()
  const bg = useColorModeValue('white', 'dark.400')

  if (!event)
    return (
      <Flex h='100vh' align='center' justify='center'>
        <Spinner size='lg'>No Event</Spinner>
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

  return (
    <Layout>
      <Seo title={title} />
      <Heading my={8} as='h1'>
        {title}
      </Heading>
      <Text fontSize='1.2em'>{description}</Text>
      <Box my={8} mx='auto' bg={bg}>
        <Image w='full' src={image} />
      </Box>

      <SimpleGrid
        p={8}
        bg={bg}
        alignItems='center'
        columns={{ base: 1, md: 2 }}
        gap={8}
      >
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
        <VStack align={{ base: 'center', md: 'flex-end' }} spacing={4}>
          <Button
            size='lg'
            target='_blank'
            rel='noopener noreferrer'
            variant='normal'
            as='a'
            leftIcon={<RiVideoChatFill />}
            href={webinar_link}
            isDisabled={!webinar_link}
          >
            Go to webinar
          </Button>

          <Button
            size='lg'
            target='_blank'
            rel='noopener noreferrer'
            variant='normal'
            as='a'
            leftIcon={<RiVideoFill />}
            href={video_link}
            isDisabled={!video_link}
          >
            View Recorded Video
          </Button>

          <Button
            size='lg'
            target='_blank'
            rel='noopener noreferrer'
            variant='normal'
            as='a'
            leftIcon={<GoRepo />}
            href={resources}
            isDisabled={!resources}
          >
            Resources
          </Button>
        </VStack>
      </SimpleGrid>
      <Box p={8} mt={8} boxShadow='md' bg={bg}>
        <Heading textAlign='center' as='h3' size='md' mb={8}>
          {t('register')}
        </Heading>
        <Box w='full' minH='450px' as='iframe' src={rsvp_embed} />
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await getEvents()
  const paths = response.map(e => ({ params: { id: e.id } }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { id } }) {
  const response = await getEvents()
  const event = response.find(e => e.id === id)

  return {
    props: {
      event,
    },
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    speaker: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string,
    webinar_link: PropTypes.string,
    rsvp_embed: PropTypes.string,
    image: PropTypes.string,
    video_link: PropTypes.string,
    resources: PropTypes.string,
  }),
}

export default Event
