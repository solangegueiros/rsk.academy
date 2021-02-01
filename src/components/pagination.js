import { Link, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'

export const PaginationLink = props => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex='1'
        borderRadius='md'
        {...rest}
      >
        <Text fontSize='sm' px='2'>
          {label}
        </Text>
        <Text
          mt='1'
          fontSize='lg'
          fontWeight='bold'
          color={useColorModeValue('rsk.green.500', 'rsk.light.500')}
        >
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  const { locale, defaultLocale } = useRouter()
  const { t } = useI18n()
  return (
    <SimpleGrid
      as='nav'
      aria-label='Pagination'
      spacing='40px'
      my='64px'
      columns={{ base: 1, md: 2 }}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          textAlign='left'
          label={t('previous')}
          href={`${previous.path}/${locale}`}
          rel='prev'
        >
          <ChevronLeftIcon mr='1' fontSize='1.2em' />
          {previous.title[locale] || previous.title[defaultLocale]}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign='right'
          label={t('next')}
          href={`${next.path}/${locale}`}
          rel='next'
        >
          {next.title[locale] || next.title[defaultLocale]}
          <ChevronRightIcon ml='1' fontSize='1.2em' />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
