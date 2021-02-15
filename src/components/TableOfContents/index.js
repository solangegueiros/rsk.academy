import PropTypes from 'prop-types'
import { Heading, Stack, useColorModeValue } from '@chakra-ui/react'

import { Entry } from './Entry'

export const TableOfContents = ({ tableOfContents, slug }) => {
  // skip the first depth which is just the current page's url and title
  const {
    items: [{ items = [] }],
  } = tableOfContents

  const color = useColorModeValue('primary.500', 'light.500')

  if (!items.length) return null

  return (
    <Stack spacing={3} position='sticky' top='0'>
      <Heading
        fontSize='sm'
        fontWeight='bold'
        textTransform='uppercase'
        letterSpacing='wide'
        color={color}
      >
        Table of Contents
      </Heading>
      <Stack spacing={1}>
        {items.map(item => (
          <Entry key={item.url} item={item} slug={slug} />
        ))}
      </Stack>
    </Stack>
  )
}

TableOfContents.propTypes = {
  slug: PropTypes.string.isRequired,
  tableOfContents: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        items: PropTypes.array,
      }),
    ),
  }),
}
