import { Icon, Text, SimpleGridProps, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

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
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent='space-between'
      as='nav'
      aria-label='Pagination'
      spacing='40px'
      my='64px'
      columns={{ base: 1, lg: 2 }}
      {...rest}
    >
      {previous ? (
        <PaginationLink href={previous.path} rel='prev'>
          <Icon
            transition='transform 0.3s'
            _groupHover={{ transform: 'translateX(-5px)' }}
            as={FaChevronLeft}
            mr='1'
            fontSize='1.2em'
          />
          <Text>{previous.title[locale] || previous.title[defaultLocale]}</Text>
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink justifyContent='flex-end' href={next.path} rel='next'>
          <Text>{next.title[locale] || next.title[defaultLocale]}</Text>
          <Icon
            transition='transform 0.3s'
            _groupHover={{ transform: 'translateX(5px)' }}
            as={FaChevronRight}
            ml='1'
            fontSize='1.2em'
          />
        </PaginationLink>
      ) : (
        <div />
      )}
    </Stack>
  )
}

export default Pagination
