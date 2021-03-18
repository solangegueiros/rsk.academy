import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import dynamic from 'next/dynamic'
import { IoLanguage, IoCalendarOutline } from 'react-icons/io5'
import { FaTwitter, FaArrowRight } from 'react-icons/fa'
import NextLink from 'next/link'

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
  const bg = useColorModeValue('primary.500', 'light.500')
  const color = useColorModeValue('white', 'dark.500')
  return (
    <Layout>
      <Seo title={t('events')} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {events.map(
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
            <Flex
              _hover={{ boxShadow: 'lg' }}
              key={id}
              flexDir='column'
              boxShadow='md'
            >
              <Box w='full' h='full'>
                <Image w='full' src={image} />
              </Box>
              <Box p={4}>
                <Heading size='md' as='h2' mb={4}>
                  {title.split(':')?.map(text => (
                    <Fragment key={text}>
                      {text}
                      <br />
                    </Fragment>
                  )) || title}
                </Heading>
                <HStack>
                  <Icon as={IoCalendarOutline} />
                  <Text>
                    <TimeZone timeStr={datetime} />
                  </Text>
                </HStack>
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
              </Box>
              <NextLink href={`/events/${id}`}>
                <Flex
                  fontWeight='bold'
                  role='group'
                  align='center'
                  cursor='pointer'
                  px={4}
                  py={2}
                  bg={bg}
                  color={color}
                >
                  <Text>More Info</Text>
                  <Icon
                    ml={4}
                    _groupHover={{ ml: 6 }}
                    transition='all 0.3s'
                    as={FaArrowRight}
                  />
                </Flex>
              </NextLink>
            </Flex>
          ),
        )}
      </SimpleGrid>
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
