/* eslint-disable react/display-name */
import { useState } from 'react'
import {
  Alert,
  Box,
  chakra,
  Icon,
  Kbd,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { CodeBlock, IconsList, PropsTable } from '@/components/index'
import { useRouter } from 'next/router'
import { FiExternalLink } from 'react-icons/fi'

const Pre = props => <chakra.div my='2em' borderRadius='sm' {...props} />

const Table = props => (
  <chakra.div overflowX='auto'>
    <chakra.table textAlign='left' mt='32px' width='full' {...props} />
  </chakra.div>
)

const THead = props => (
  <chakra.th
    bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
    fontWeight='600'
    p={2}
    fontSize='sm'
    {...props}
  />
)

const TData = props => (
  <chakra.td
    p={2}
    borderTopWidth='1px'
    borderColor='inherit'
    fontSize='sm'
    whiteSpace='normal'
    {...props}
  />
)

const LinkedHeading = props => {
  const color = useColorModeValue('primary.500', 'rsk.text.500')
  return (
    <chakra.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
      <span>{props.children}</span>
      {props.id && (
        <chakra.a
          aria-label='anchor'
          color={color}
          fontWeight='normal'
          outline='none'
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml='0.375rem'
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.h2>
  )
}

const InlineCode = props => (
  <chakra.code
    apply='mdx.code'
    color={useColorModeValue('purple.500', 'purple.200')}
    {...props}
  />
)

const MdxImage = props => {
  const INITIAL_WIDTH = 400
  const [w, setW] = useState(INITIAL_WIDTH)

  const toggleWidth = () => setW(w === INITIAL_WIDTH ? 'full' : INITIAL_WIDTH)

  return (
    <chakra.img
      apply='mdx.img'
      w={w}
      maxW='full'
      my={2}
      onClick={toggleWidth}
      cursor={w === INITIAL_WIDTH ? 'zoom-in' : 'zoom-out'}
      {...props}
    />
  )
}

const Navigate = props => {
  const { locale } = useRouter()
  const MDX_PATHS = ['/courses/', '/blog/']

  const isExternalLink = props.href?.[0] !== '/'
  const isMarkdownPage = MDX_PATHS.some(path => props.href?.includes(path))
  const to = isMarkdownPage ? `${props.href}/${locale}` : props.href

  if (isExternalLink) {
    return (
      <chakra.a apply='mdx.a' target='_blank' {...props}>
        {props.children}{' '}
        <Icon transform='translateY(-2px)' as={FiExternalLink} />
      </chakra.a>
    )
  }

  return (
    <NextLink href={to}>
      <chakra.a apply='mdx.a' {...props} />
    </NextLink>
  )
}

export const MdxComponents = {
  h1: props => <chakra.h1 apply='mdx.h1' {...props} />,
  h2: props => <LinkedHeading apply='mdx.h2' {...props} />,
  h3: props => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
  h4: props => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
  hr: props => <chakra.hr apply='mdx.hr' {...props} />,
  strong: props => <Box as='strong' fontWeight='600' {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: props => <Box height='24px' {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: props => <Navigate {...props} />,
  p: props => <chakra.p apply='mdx.p' {...props} />,
  ul: props => <chakra.ul apply='mdx.ul' {...props} />,
  ol: props => <chakra.ol apply='mdx.ul' {...props} />,
  li: props => <chakra.li pb='4px' {...props} />,
  img: props => <MdxImage {...props} />,
  blockquote: props => (
    <Alert
      mt='4'
      role='none'
      status='warning'
      variant='left-accent'
      as='blockquote'
      rounded='4px'
      my='1.5rem'
      {...props}
    />
  ),
  IconsList,
  PropsTable,
}

export default MdxComponents
