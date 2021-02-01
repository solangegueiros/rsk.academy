import { Link, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
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

export const TableOfContents = ({ tableOfContents, slug }) => {
  // skip the first depth which is just the current page's url and title
  const {
    items: [{ items = [] }],
  } = tableOfContents

  const color = useColorModeValue('rsk.green.500', 'rsk.light.500')

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
