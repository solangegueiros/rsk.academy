/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Alert, Box, chakra, ChakraComponent, Kbd, useColorModeValue } from '@chakra-ui/react'

import * as Components from '@components'
import { CodeBlock } from '@components'

import { LinkedHeading } from './LinkedHeading'
import { MdxImage } from './MdxImage'
import { Navigate } from './Navigate'
import { MdxTable, MdxTHead, MdxTd } from './Table'

const Pre = (props: ChakraComponent<'div'>): JSX.Element => <chakra.div my='2em' borderRadius='sm' {...props} />

const InlineCode = (props: ChakraComponent<'code'>): JSX.Element => (
  <chakra.code apply='mdx.code' color={useColorModeValue('green.500', 'light.500')} {...props} />
)

const H1 = props => <chakra.h1 apply='mdx.h1' {...props} />
const H2 = props => <LinkedHeading apply='mdx.h2' {...props} />
const H3 = props => <LinkedHeading as='h3' apply='mdx.h3' {...props} />
const H4 = props => <LinkedHeading as='h4' apply='mdx.h4' {...props} />
const Hr = props => <chakra.hr apply='mdx.hr' {...props} />
const Strong = props => <Box as='strong' fontWeight='600' {...props} />
const A = props => <Navigate {...props} />
const P = props => <chakra.p apply='mdx.p' {...props} />
const Ul = props => <chakra.ul apply='mdx.ul' {...props} />
const Ol = props => <chakra.ol apply='mdx.ul' {...props} />
const Li = props => <chakra.li pb='4px' {...props} />
const Img = props => <MdxImage {...props} />
const Blockquote = props => (
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
)

export const Markdown = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  hr: Hr,
  strong: Strong,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  table: MdxTable,
  th: MdxTHead,
  td: MdxTd,
  a: A,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  img: Img,
  blockquote: Blockquote,
  ...Components,
}
