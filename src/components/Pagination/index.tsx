import { Icon, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PaginationLink } from './PaginationLink'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface PaginationProps {
  previous: {
    title: { en: string; es: string; pt: string }
    path: string
  }
  next: {
    title: { en: string; es: string; pt: string }
    path: string
  }
}

export const Pagination = ({ previous, next, ...rest }: PaginationProps & SimpleGridProps): JSX.Element => {
  const { locale, defaultLocale } = useRouter()
  const { t } = useTranslation('common')
  return (
    <SimpleGrid as='nav' aria-label='Pagination' spacing='40px' my='64px' columns={{ base: 1, md: 2 }} {...rest}>
      {previous ? (
        <PaginationLink textAlign='left' label={t`previous`} href={previous.path} rel='prev'>
          <Icon as={FaChevronLeft} mr='1' fontSize='1.2em' />
          {previous.title[locale] || previous.title[defaultLocale]}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink textAlign='right' label={t`next`} href={next.path} rel='next'>
          {next.title[locale] || next.title[defaultLocale]}
          <Icon as={FaChevronRight} ml='1' fontSize='1.2em' />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
