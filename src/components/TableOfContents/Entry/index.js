import PropTypes from 'prop-types'
import { Link, Stack, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Entry = ({ item, indent, slug }) => {
  const { url, title, items = [] } = item
  const color = useColorModeValue('gray.600', 'whiteAlpha.600')
  const { locale } = useRouter()

  return (
    <Stack spacing={1} pl={indent && 4} mt='1'>
      <Link color={color} fontSize='sm' href={`${slug}${url}`}>
        {title[locale]}
      </Link>
      <Stack spacing={1}>
        {items.map(elem => (
          <Entry key={elem.url} slug={slug} item={elem} indent />
        ))}
      </Stack>
    </Stack>
  )
}

Entry.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
  }),
  indent: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  slug: PropTypes.string,
}
