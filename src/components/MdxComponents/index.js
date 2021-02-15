/* eslint-disable react/display-name */
import { Alert, Box, chakra, Kbd, useColorModeValue } from '@chakra-ui/react'

import { CodeBlock, PropsTable } from '@/components/all'
import { IconsList } from './IconsLists'
import { Navigate } from './Navigate'
import { LinkedHeading } from './LinkedHeading'
import { Table, THead, Td } from './Table'
import { MdxImage } from './MdxImage'

const Pre = props => <chakra.div my='2em' borderRadius='sm' {...props} />

const InlineCode = props => (
  <chakra.code
    apply='mdx.code'
    color={useColorModeValue('purple.500', 'purple.200')}
    {...props}
  />
)

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
  td: Td,
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
