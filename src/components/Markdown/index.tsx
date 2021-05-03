/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Alert, Box, chakra, ChakraComponent, Kbd, useColorModeValue } from '@chakra-ui/react'

import * as Components from '@components'
import { CodeBlock } from '@components'
import { LinkedHeading } from './LinkedHeading'
import { MdxTable, MdxTHead, MdxTd } from './Table'
import { MdxImage } from './MdxImage'
import { Navigate } from './Navigate'

const Pre = (props: ChakraComponent<'div'>): JSX.Element => <chakra.div my='2em' borderRadius='sm' {...props} />

const InlineCode = (props: ChakraComponent<'code'>): JSX.Element => (
  <chakra.code apply='mdx.code' color={useColorModeValue('green.500', 'light.500')} {...props} />
)

export const Markdown = {
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
  table: MdxTable,
  th: MdxTHead,
  td: MdxTd,
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
  ...Components,
}
