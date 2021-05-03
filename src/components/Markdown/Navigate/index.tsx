import { chakra, Icon, HTMLChakraProps } from '@chakra-ui/react'

import { FiExternalLink } from 'react-icons/fi'
import NextLink from 'next/link'

export const Navigate = (props: HTMLChakraProps<'a'>): JSX.Element => {
  const isExternalLink = props.href?.[0] !== '/'

  if (isExternalLink) {
    return (
      <chakra.a apply='mdx.a' rel='noreferrer' target='_blank' {...props}>
        {props.children} <Icon transform='translateY(-2px)' as={FiExternalLink} />
      </chakra.a>
    )
  }

  return (
    <NextLink href={props.href}>
      <chakra.a apply='mdx.a' {...props} />
    </NextLink>
  )
}
