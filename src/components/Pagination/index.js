import PropTypes from 'prop-types'
import { SimpleGrid } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'

import { PaginationLink } from './PaginationLink'

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

Pagination.propTypes = {
  previous: PropTypes.shape({
    title: PropTypes.object,
    path: PropTypes.string,
  }),
  next: PropTypes.shape({
    title: PropTypes.object,
    path: PropTypes.string,
  }),
}

export default Pagination
